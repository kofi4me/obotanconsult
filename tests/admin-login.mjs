const nativeFetch=globalThis.fetch; globalThis.fetch=(url,options={})=>nativeFetch(url,{...options,signal:AbortSignal.timeout(15000),headers:{...options.headers,connection:'close'}});
import assert from 'node:assert/strict';
// Loopback-only synthetic credentials; never run this suite against production.
const base='http://127.0.0.1:8787';
const post=(path,body={},headers={})=>fetch(base+path,{method:'POST',headers:{origin:base,'content-type':'application/json',...headers},body:JSON.stringify(body)});
assert.equal((await fetch(base+'/api/admin/submissions')).status,403);
assert.equal((await fetch(base+'/api/admin/submissions',{headers:{'oai-authenticated-user-email':'obotanconsult@gmail.com','oai-authenticated-user-id':'forged'}})).status,403);
assert.equal((await post('/api/auth/login',{}, {origin:'https://evil.example'})).status,403);
assert.equal((await post('/api/auth/login',{email:'obotanconsult@gmail.com',password:'wrong'})).status,401);
const login=await post('/api/auth/login',{email:'obotanconsult@gmail.com',password:'obotan_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'});
assert.equal(login.status,200,await login.text());
const cookie=login.headers.get('set-cookie').split(';')[0];
assert.equal((await fetch(base+'/api/admin/submissions',{headers:{cookie}})).status,200);
assert.equal((await post('/api/auth/logout',{}, {cookie,origin:'https://evil.example'})).status,403);
assert.equal((await post('/api/auth/logout',{}, {cookie})).status,200);
assert.equal((await fetch(base+'/api/admin/submissions',{headers:{cookie}})).status,403);
for(let i=0;i<3;i++)await post('/api/auth/login',{email:'obotanconsult@gmail.com',password:'wrong'});
assert.equal((await post('/api/auth/login',{email:'obotanconsult@gmail.com',password:'obotan_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'})).status,429);
console.log('PASS: anonymous and spoofed access denied, CSRF rejected, valid login, protected data, logout revocation and rate limiting.');


