# Cloudflare deployment

Database: obotanconsult-db
Database ID: 949590fb-70b3-45cd-b424-fdda920fedea
Worker name: obotanconsult

Cloudflare Workers Builds settings:
- Build command: npm run build
- Deploy command: npm run deploy:cloudflare

The deploy command applies tracked D1 migrations, then deploys the Worker. The build/deploy token needs access to this database. If tables were already created manually, reconcile the migration history before applying migrations; do not delete existing data.

No R2 subscription or bucket is required. CVs are sent by the client using their email app after booking.

Standalone admin access is deliberately disabled pending Cloudflare authentication setup. Sites identity headers cannot be trusted on a public Worker. The website must not be considered fully migrated until admin authentication is configured and tested.

For the existing Sites-hosted version, build with OBOTAN_HOSTING=sites. It retains its own platform-managed DB and authentication. Existing Sites bookings do not automatically migrate into this database.
