# I2T-docs filesystem MCP server

Exposes a **read-only** view of this repo over MCP (Streamable HTTP transport) so
AI clients can browse/search/read the docs directly. Runs in Docker for
isolation; Caddy (native, on the host) terminates TLS and enforces a
bearer-token check in front of it.

## Layers of read-only enforcement

1. App: `index.js` only implements `list_directory`, `read_file`, `get_file_info`,
   `search_files` — no write/edit/delete tool exists.
2. Container: `docker-compose.yml` bind-mounts the repo checkout as `:ro` and
   sets `read_only: true` + `cap_drop: [ALL]` on the container itself.
3. Network: the container only publishes to `127.0.0.1:3000` — it's never
   reachable except through Caddy.

## One-time host setup

```bash
# 1. Checkout the repo the server will serve (separate from your Pages deploy)
sudo git clone --depth 1 https://github.com/<org>/<repo>.git /srv/i2t-docs-repo

# 2. Keep it in sync (cron, as whichever user owns the checkout)
crontab -e
# */15 * * * * git -C /srv/i2t-docs-repo pull --ff-only

# 3. Generate a token and configure env
cd mcp-server
cp .env.example .env
openssl rand -hex 32   # paste result into .env as MCP_TOKEN
```

## Run it

```bash
cd mcp-server
docker compose up -d --build
docker compose logs -f   # confirm "listening on :3000"
```

## Wire up Caddy

This is served path-based off the existing shared Caddyfile (one
host:port, multiple `handle_path` blocks — see `/here`, `/alligator`).
Add the block from `deploy/Caddyfile.snippet` to that Caddyfile, replacing
`REPLACE_WITH_YOUR_TOKEN` with the exact same value you put in
`mcp-server/.env` as `MCP_TOKEN` (generate once with `openssl rand -hex 32`,
paste it in both places — it's a plain literal in the Caddyfile, not an env
var, so keep the Caddyfile's permissions locked down like any other secret).
Then reload Caddy.

The externally visible URL ends up being:

```
http://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp
```

**Note:** this site is plain `http://`, not `https://` — the bearer token
and all repo contents travel unencrypted. That's an acceptable tradeoff for
an internal/trusted network, but if the docs (and this URL) are public on
the internet, anyone on the network path between a user and the VM can read
the token off the wire. Worth checking whether Caddy/the VM can terminate
TLS for this port before publishing the URL widely.

## Client-side config (for the docs site)

Generic MCP clients that support remote Streamable HTTP servers natively:

```json
{
  "mcpServers": {
    "i2t-docs": {
      "type": "http",
      "url": "http://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp",
      "headers": {
        "Authorization": "Bearer <token-you-were-given>"
      }
    }
  }
}
```

Claude Desktop does not (as of writing) accept a remote `url` directly in
`claude_desktop_config.json` — use one of:

- **Settings → Connectors → Add custom connector**, paste the URL and add the
  `Authorization: Bearer <token>` header in the UI, or
- the `mcp-remote` stdio bridge:

  ```json
  {
    "mcpServers": {
      "i2t-docs": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "http://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp",
          "--header", "Authorization:Bearer <token-you-were-given>"
        ]
      }
    }
  }
  ```

  Check `npx mcp-remote --help` for the exact header-flag spelling on the
  version you install — it has changed across releases.

Distribute the token out-of-band (not committed to the repo or posted
publicly next to the URL) — anyone with it can read the whole mounted repo.
