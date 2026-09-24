import {generatePassword,hashPassword} from '../lib/password.ts';
if(!process.stdin.isTTY||!process.stdout.isTTY)throw new Error('Run this setup tool in your own interactive terminal.');
const password=generatePassword();
const hash=await hashPassword(password);
console.log('\nSave this generated WEBSITE PASSWORD in your password manager:\n');
console.log(password);
console.log('\nCloudflare > Workers & Pages > obotanconsult > Settings > Variables and Secrets:\nAdd a Secret named ADMIN_PASSWORD_HASH with this VERIFIER value:\n');
console.log(hash);
console.log('\nSave and deploy, then sign in at /admin as obotanconsult@gmail.com.\nDo not put the website password in Cloudflare or share either value in chat.\nNo credentials were saved to disk. Close this terminal after saving the values.');
