import {database,json,sameOrigin,limitedBody,ADMIN_EMAIL} from '@/lib/server';
import {passwordHash} from '@/lib/admin-session';
import {digest,randomToken,verifyPassword,sessionCookie,SESSION_SECONDS} from '@/lib/password';
export async function POST(request:Request){
  if(!sameOrigin(request))return json({error:'Request not permitted.'},403);
  try{
    const stored=passwordHash();if(!stored)return json({error:'Admin login has not been configured.'},503);
    const now=Date.now();
    // Atomic D1 counters apply before expensive hashing, across all Worker instances.
    for(const [key,limit] of [[`ip:${request.headers.get('cf-connecting-ip')||'local'}`,5],['account',20]] as const){
      const id=`login:${Math.floor(now/900000)}:${digest(key)}`;
      const row=await database().prepare('INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(id,now+900000).first<{count:number}>();
      if(!row||row.count>limit)return json({error:'Too many attempts. Please wait 15 minutes before trying again.'},429);
    }
    let input;try{input=JSON.parse(new TextDecoder().decode(await limitedBody(request,2048)))}catch{return json({error:'Invalid sign-in request.'},400)}
    if(typeof input?.email!=='string'||typeof input?.password!=='string'||input.password.length>128)return json({error:'Email or password is incorrect.'},401);
    const correct=await verifyPassword(input.password,stored);
    if(!correct||input.email.trim().toLowerCase()!==ADMIN_EMAIL)return json({error:'Email or password is incorrect.'},401);
    const token=randomToken();
    await database().batch([
      database().prepare('DELETE FROM admin_sessions WHERE expires_at<=? OR last_seen<=? OR credential_version<>?').bind(now,now-1800000,digest(stored)),
      database().prepare('INSERT INTO admin_sessions(token_hash,credential_version,expires_at,last_seen) VALUES (?,?,?,?)').bind(digest(token),digest(stored),now+SESSION_SECONDS*1000,now),
      database().prepare('DELETE FROM rate_limits WHERE expires<?').bind(now),
    ]);
    const response=json({ok:true});response.headers.set('Set-Cookie',sessionCookie(token));return response;
  }catch{ return json({error:'Sign-in is temporarily unavailable. Please try again.'},503)}
}
