CREATE TABLE admin_sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  credential_version TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE INDEX idx_admin_sessions_expiry ON admin_sessions(expires_at);
