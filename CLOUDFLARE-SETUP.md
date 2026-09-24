# Standalone Cloudflare database setup

The Sites preview database ID is a local placeholder. It must not be used in your own Cloudflare account.

1. Create a D1 database named `obotanconsult-db` in the same account as the `obotanconsult` Worker.
2. Set the Workers **Build** variable `CLOUDFLARE_D1_DATABASE_ID` to that database's actual UUID. This must be available to `npm run build`; setting only a runtime variable is insufficient.
3. In the new database's Console, execute the schema from `drizzle/0000_vengeful_richard_fisk.sql` once. This creates the bookings and rate-limit tables and indexes. Do not replay it on a database whose tables already exist.
4. Rebuild the latest GitHub revision. The generated `dist/server/wrangler.json` must contain your real UUID for binding `DB` and zero R2 bindings.

Existing Sites data is not automatically migrated into the new database.

Standalone admin authentication must be configured before the raw Worker is opened for clients. The current ChatGPT authentication headers are trusted only behind the Sites dispatcher; they are not a standalone Cloudflare authentication mechanism. Database setup alone does not complete the hosting migration.
