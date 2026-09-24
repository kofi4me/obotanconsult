# Cloudflare deployment

Database: obotanconsult-db
Database ID: 949590fb-70b3-45cd-b424-fdda920fedea
Worker name: obotanconsult

Cloudflare Workers Builds settings:
- Build command: npm run build
- Deploy command: npm run deploy:cloudflare

The deploy command applies tracked D1 migrations, then deploys the Worker. The build/deploy token needs access to this database. If tables were already created manually, reconcile the migration history before applying migrations; do not delete existing data.

No R2 subscription or bucket is required. CVs are sent by the client using their email app after booking.

Standalone admin access requires the Cloudflare Access configuration below. Sites identity headers cannot be trusted on a public Worker. The website must not be considered fully migrated until admin authentication is configured and tested.

For the existing Sites-hosted version, build with OBOTAN_HOSTING=sites. It retains its own platform-managed DB and authentication. Existing Sites bookings do not automatically migrate into this database.

## Cloudflare Access admin login

Public URL: https://obotanconsult.gr8owusu222.workers.dev/
Admin URL: https://obotanconsult.gr8owusu222.workers.dev/admin

1. In Cloudflare Zero Trust / Cloudflare One, create a self-hosted Access application named Obotan Admin. Protect the admin path on obotanconsult.gr8owusu222.workers.dev. Include /admin and its subpaths, and /api/admin and its subpaths in the same application where multi-path destinations are available. Do not protect the whole public site.
2. Configure an Allow policy with Emails = obotanconsult@gmail.com only. Enable one-time PIN email login. Do not add an Everyone or Bypass rule.
3. Copy the Team Domain and Application Audience (AUD) tag.
4. Set Worker runtime variables CF_ACCESS_TEAM_DOMAIN (https://your-team.cloudflareaccess.com) and CF_ACCESS_AUD (the exact audience tag). These IDs are not secrets. The deploy config preserves dashboard variables with keep_vars.
5. Visit /admin, authenticate using the code sent to obotanconsult@gmail.com, and verify the dashboard loads. Public service pages and /api/slots should remain accessible without login.

The app validates the JWT signature, issuer, audience, expiration and admin email for both the UI and each protected API endpoint. Missing or invalid configuration denies access. No separate website password is created. Emailed login codes are sent by Cloudflare Access.

