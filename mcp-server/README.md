# I2T-docs filesystem MCP server

Exposes a **read-only** view of this repo's `docs/` content over MCP
(Streamable HTTP transport) so AI clients can browse/search/read the docs
directly. Runs in Docker for isolation; Caddy (native, on the host)
reverse-proxies to it. No auth — this is public documentation, same content
as the GitHub Pages site.

## Layers of read-only enforcement

1. App: `index.js` only implements `list_directory`, `read_file`, `get_file_info`,
   `search_files` — no write/edit/delete tool exists.
2. Container: `docker-compose.yml` bind-mounts `../docs` as `:ro` and sets
   `read_only: true` + `cap_drop: [ALL]` on the container itself.
3. Network: the container only publishes to `127.0.0.1:3000` — it's never
   reachable except through Caddy.

## Run it

```bash
cd mcp-server
docker compose up -d --build
docker compose logs -f   # confirm "listening on :3000"
```

By default this mounts `../docs` relative to this folder (i.e. this repo's
own checkout). Override `REPO_PATH` in `.env` to point at a different
checkout instead.

## Wire up Caddy

Served path-based off the existing shared Caddyfile (one host:port, multiple
`handle_path` blocks — see `/here`, `/alligator`). Add the block from
`deploy/Caddyfile.snippet` to that Caddyfile, then reload Caddy.

**This has to be HTTPS**, not plain HTTP: Claude's remote-connector UI
rejects `http://` URLs outright, and a single port can't serve both HTTP and
HTTPS depending on path (TLS is negotiated before Caddy sees the path). So
the whole site block moves to `https://` — `/here` and `/alligator` become
HTTPS-only as a side effect, not just `/i2t-docs-mcp`. See the snippet for
what that requires (port 80 reachable for Let's Encrypt, or an existing cert
loaded manually).

The externally visible URL ends up being:

```
https://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp
```

## Client-side config (for the docs site)

Generic MCP clients that support remote Streamable HTTP servers natively:

```json
{
  "mcpServers": {
    "i2t-docs": {
      "type": "http",
      "url": "https://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp"
    }
  }
}
```

**Claude Desktop / claude.ai:** Settings → Connectors → Add custom connector
→ paste the URL above. No headers needed.

If you ever do need a stdio-only client to reach it, the `mcp-remote` bridge
still works:

```json
{
  "mcpServers": {
    "i2t-docs": {
      "command": "npx",
      "args": ["mcp-remote", "https://vm.chronos.disco.unimib.it:3004/i2t-docs-mcp/mcp"]
    }
  }
}
```
