const nativeFetch=globalThis.fetch; globalThis.fetch=(url,options={})=>nativeFetch(url,{...options,signal:AbortSignal.timeout(15000),headers:{...options.headers,connection:'close'}});
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const base='http://127.0.0.1:8787';
const sql=command=>execFileSync(process.execPath,['--import','./scripts/sites-env.mjs','node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','cloudflare-db.json','--persist-to','.wrangler/state','--command',command],{stdio:'pipe'});
const login=async()=>{sql('DELETE FROM rate_limits;');const r=await fetch(base+'/api/auth/login',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email:'obotanconsult@gmail.com',password:'obotan_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'})});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0]};
for(const condition of ['expires_at=0','last_seen=0',"credential_version='old-password'"]){
 const cookie=await login();sql(`UPDATE admin_sessions SET ${condition};`);
 assert.equal((await fetch(base+'/api/admin/submissions',{headers:{cookie}})).status,403);
}
const page=await fetch(base+'/admin');assert.match(page.headers.get('cache-control'),/no-store/);assert.equal(page.headers.get('x-frame-options'),'DENY');
const html=await page.text();assert(!html.includes('Book a consultation'));
sql('DELETE FROM rate_limits; DELETE FROM admin_sessions;');
console.log('PASS: absolute expiry, idle expiry, credential rotation, private page headers and isolated admin navigation.');

