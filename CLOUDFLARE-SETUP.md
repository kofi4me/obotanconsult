# Cloudflare deployment and private admin login

Worker: obotanconsult
Public URL: https://obotanconsult.gr8owusu222.workers.dev/
Admin URL: https://obotanconsult.gr8owusu222.workers.dev/admin
Database: obotanconsult-db (949590fb-70b3-45cd-b424-fdda920fedea)

Build: npm run build
Deploy: npm run deploy:cloudflare
The deploy command applies D1 migrations before deploying. No R2 or Zero Trust activation is required.

## Set or reset the admin password

1. In this project folder, run `node --experimental-strip-types scripts/setup-admin.mjs` in a terminal.
2. Save the generated 50-character website password in your password manager. The tool generates 256 random bits locally. Do not substitute a human-chosen password or your Gmail password.
3. Copy the resulting salted hash. In Cloudflare > Workers & Pages > obotanconsult > Settings > Variables and Secrets, add a **Secret** named `ADMIN_PASSWORD_HASH` and paste that verifier. Save and deploy. Do not put the plaintext password in Cloudflare, GitHub or chat.
4. Open the admin URL and sign in as obotanconsult@gmail.com with the generated website password.

There is no default password, public registration or unauthenticated reset. To reset a lost password, repeat the process using your Cloudflare account. Replacing the hash revokes existing sessions. Enable two-factor authentication on the Cloudflare account that controls these secrets.

If an Access application was previously created for this Worker, remove its protection after this login is deployed; otherwise Access may intercept requests before the application. CF_ACCESS_TEAM_DOMAIN and CF_ACCESS_AUD are no longer used for standalone login.

## Protections and limits

Machine-generated 256-bit passwords with domain-separated salted SHA-256 verifiers (fast hashing is safe here because passwords are randomly generated, not human-chosen); constant-time hash comparison; random 256-bit session tokens with only SHA-256 token hashes in D1; Secure, HttpOnly, SameSite=Strict host-only cookies; 30-minute inactivity and four-hour absolute expiry; server-side revocation on logout; credential rotation invalidation; same-origin POST checks; bounded request bodies; atomic D1 rate limits (5 attempts/IP and 20 total per 15-minute window); server authorization on every admin data endpoint. Login errors do not distinguish unknown email from wrong password.

The public website has no client login. Password authentication has no additional subscription; existing Workers and D1 plan limits still apply. Verify successful authentication after configuring the deployed Worker. The generated-password approach avoids expensive password derivation on the Free Worker. MFA within this website is not implemented.

Sites-hosted builds use OBOTAN_HOSTING=sites and retain platform authentication and separate data.

