import {env} from 'cloudflare:workers';
import {digest,sessionToken,validHash} from './password';
import {ADMIN_EMAIL} from './cloudflare-access';

export function passwordHash(){const value=Reflect.get(env,'ADMIN_PASSWORD_HASH');return validHash(value)?value:null}
export async function sessionUser(headers:Headers){
  const hash=passwordHash(),token=sessionToken(headers);
  if(!hash||!token||!env.DB)return null;
  const row=await env.DB.prepare('SELECT token_hash FROM admin_sessions WHERE token_hash=? AND credential_version=? AND expires_at>? AND last_seen>?').bind(digest(token),digest(hash),Date.now(),Date.now()-30*60*1000).first();
  if(!row)return null;
  await env.DB.prepare('UPDATE admin_sessions SET last_seen=? WHERE token_hash=?').bind(Date.now(),digest(token)).run();
  return {userId:'obotan-admin',email:ADMIN_EMAIL,displayName:'Obotan Administrator',fullName:null};
}

