# App_Obotan Consult

Public, account-free client intake with a protected admin workspace for obotanconsult@gmail.com.

## Included
- Home, Business Docs, EB1A, EB1B and EB2 NIW pages.
- Self-reported evidence checklists, post-booking CV email links, consent and contact details.
- 40-minute bookings: Wednesday and Thursday 18:00–22:00; Saturday 09:00–12:00. America/New_York applies Eastern daylight-saving changes. Slots end within office hours and are available eight weeks ahead.
- D1 booking records, no R2 dependency, atomic reservation uniqueness, bounded form bodies and submission rate limiting.
- Admin review, internal notes, statuses, cancellation and record deletion. Every admin endpoint checks the signed-in email server-side.
- Clear non-attorney disclosures throughout. No eligibility scores, legal advice, representation or filing.

## Operation
Clients receive an on-screen confirmation and an optional calendar download. Obotan must contact clients with meeting details. Prefilled Gmail compose links include the service, client name and booking reference. No automatic email delivery, video meeting provider, payments or external calendar integration is configured.

Admin sign-in uses the hosting platform's ChatGPT identity. Sign in with the account whose email is obotanconsult@gmail.com. The production dispatcher owns authentication headers; never expose the raw Worker as an independent public origin without equivalent header validation.

For privacy requests, use the admin deletion action after verifying the requester. No automatic retention schedule is configured. Clients manually attach documents in Gmail (or their preferred email service) and send them to obotanconsult@gmail.com. Email receipt is not tracked by the website. Deleting a booking does not delete emailed documents. Legacy file columns remain for schema compatibility; existing stored objects are not deleted by this change.

## Development and verification
- Install: npm run install:ci
- Preview: npm run dev
- Type check: node node_modules/typescript/bin/tsc --noEmit
- Schedule checks: node --experimental-strip-types tests/schedule.mjs
- Build: npm run build
- API checks: node tests/api.mjs (compiled local Worker on 127.0.0.1:8787 with local migrations applied; synthetic records are removed).

On this Windows host, invoking the npm CLI via `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run build` avoids a system npm shim issue. The bundled Sites skill owns source packaging and production publication. Keep local runtime data out of version control.

The API tests inject platform headers solely into a loopback test Worker. They must not be run against a public origin. The development preview's bundled mock identity is not an authorized production admin.

## Official references
- 8 CFR 204.5(h), (i), (k): https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-204/subpart-A/section-204.5
- USCIS EB2/NIW: https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-5

Checklists are general information, not exhaustive legal advice. Content and service-scope version: 2026-09-23.


