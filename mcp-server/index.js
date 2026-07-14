import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const ROOT_DIR = path.resolve(process.env.MCP_ROOT ?? "/data");
const PORT = Number(process.env.PORT ?? 3000);

// Resolves a repo-relative path and rejects anything that escapes ROOT_DIR
// (symlink targets included), so path traversal can't reach the host fs.
async function resolveSafe(relPath) {
  const abs = path.resolve(ROOT_DIR, relPath || ".");
  if (abs !== ROOT_DIR && !abs.startsWith(ROOT_DIR + path.sep)) {
    throw new Error("Path escapes the allowed root");
  }
  const real = await fs.realpath(abs);
  const realRoot = await fs.realpath(ROOT_DIR);
  if (real !== realRoot && !real.startsWith(realRoot + path.sep)) {
    throw new Error("Path escapes the allowed root");
  }
  return abs;
}

function buildServer() {
  const server = new McpServer({ name: "i2t-docs-fs", version: "1.0.0" });

  server.registerTool(
    "list_directory",
    {
      description: "List files and subdirectories at a path relative to the docs repo root (read-only).",
      inputSchema: { path: z.string().default(".") },
    },
    async ({ path: relPath }) => {
      const abs = await resolveSafe(relPath);
      const entries = await fs.readdir(abs, { withFileTypes: true });
      const text = entries
        .map((e) => `${e.isDirectory() ? "[dir] " : "[file]"} ${e.name}`)
        .join("\n");
      return { content: [{ type: "text", text: text || "(empty directory)" }] };
    }
  );

  server.registerTool(
    "read_file",
    {
      description: "Read a file's contents from the docs repo (read-only, UTF-8 text).",
      inputSchema: { path: z.string() },
    },
    async ({ path: relPath }) => {
      const abs = await resolveSafe(relPath);
      const text = await fs.readFile(abs, "utf-8");
      return { content: [{ type: "text", text }] };
    }
  );

  server.registerTool(
    "get_file_info",
    {
      description: "Get size/type/mtime metadata for a path in the docs repo (read-only).",
      inputSchema: { path: z.string() },
    },
    async ({ path: relPath }) => {
      const abs = await resolveSafe(relPath);
      const stat = await fs.stat(abs);
      const info = {
        type: stat.isDirectory() ? "directory" : "file",
        size: stat.size,
        modified: stat.mtime.toISOString(),
      };
      return { content: [{ type: "text", text: JSON.stringify(info, null, 2) }] };
    }
  );

  server.registerTool(
    "search_files",
    {
      description: "Recursively search for files under the docs repo whose path contains a substring (read-only).",
      inputSchema: { query: z.string(), path: z.string().default(".") },
    },
    async ({ query, path: relPath }) => {
      const startAbs = await resolveSafe(relPath);
      const matches = [];
      async function walk(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
          const abs = path.join(dir, e.name);
          const rel = path.relative(ROOT_DIR, abs);
          if (rel.toLowerCase().includes(query.toLowerCase())) matches.push(rel);
          if (e.isDirectory()) await walk(abs);
        }
      }
      await walk(startAbs);
      return { content: [{ type: "text", text: matches.join("\n") || "(no matches)" }] };
    }
  );

  return server;
}

const app = express();
app.use(express.json());

// Stateless mode: a fresh server+transport per request, so there's no
// session state to leak or clean up between callers.
app.post("/mcp", async (req, res) => {
  try {
    const server = buildServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "internal error" });
    }
  }
});

app.get("/mcp", (_req, res) => {
  res.status(405).json({ error: "method not allowed (stateless server, use POST)" });
});

app.delete("/mcp", (_req, res) => {
  res.status(405).json({ error: "method not allowed (stateless server, use POST)" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`i2t-docs MCP server listening on :${PORT}, root=${ROOT_DIR}`);
});
