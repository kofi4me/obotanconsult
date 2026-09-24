import assert from 'node:assert/strict';
import {generatePassword,hashPassword,verifyPassword,sessionToken,sessionCookie,digest,randomToken} from '../lib/password.ts';
const password=generatePassword(); assert.equal(password.length,50); const hash=await hashPassword(password);
assert(await verifyPassword(password,hash));
assert(!await verifyPassword('wrong-password',hash));
assert(!await verifyPassword('anything','malformed'));
assert.notEqual(hash,await hashPassword(password));
await assert.rejects(()=>hashPassword('short'));
const token=randomToken();assert.equal(token.length,64);assert.notEqual(token,randomToken());
assert.equal(sessionToken(new Headers({cookie:`__Host-obotan-admin=${token}`})),token);
assert.equal(sessionToken(new Headers({'oai-authenticated-user-email':'obotanconsult@gmail.com','cf-access-authenticated-user-email':'obotanconsult@gmail.com'})),null);
assert.equal(sessionToken(new Headers({cookie:'__Host-obotan-admin=forged'})),null);
assert.match(sessionCookie(token),/HttpOnly; Secure; SameSite=Strict/);
assert.match(sessionCookie('',0),/Max-Age=0/);
assert.notEqual(digest(token),token);
console.log('PASS: password hashing, wrong passwords, unique salts, minimum length, random tokens, cookie validation and flags.');

