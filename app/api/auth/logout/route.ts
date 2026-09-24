import {database,json,sameOrigin} from '@/lib/server';
import {digest,sessionToken,sessionCookie} from '@/lib/password';
export async function POST(request:Request){
  if(!sameOrigin(request))return json({error:'Request not permitted.'},403);
  const token=sessionToken(request.headers);
  if(token)await database().prepare('DELETE FROM admin_sessions WHERE token_hash=?').bind(digest(token)).run();
  const response=json({ok:true});response.headers.set('Set-Cookie',sessionCookie('',0));return response;
}
