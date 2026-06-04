---
sidebar_position: 5
---

# Log System

The backend tracks every user operation on a table through a two-layer log system. Logs are written per *(dataset, table)* pair and drive the **dependency graph** that the frontend uses to show operation history and handle cascaded deletes.

## Overview

| Layer | File | Format | Purpose |
|---|---|---|---|
| Plain-text log | `public/logs/logs-{datasetId}-{tableId}.log` | One line per operation | Human-readable audit trail |
| JSON Lines log | `public/logs/logs-{datasetId}-{tableId}.jsonl` | One JSON object per line | Machine-readable; powers the dependency graph |

Both files are written in parallel for every logged operation. The `.jsonl` file is the authoritative source; the `.log` file is kept in sync mainly for quick manual inspection.

## File locations

All log files live under `public/logs/` relative to the backend process working directory. The directory is created automatically on first write.

```
public/
└── logs/
    ├── logs-1-3.log
    ├── logs-1-3.jsonl
    ├── logs-2-7.log
    └── logs-2-7.jsonl
```

## Operation types

Both services share the same set of operation type constants:

| Constant | Value | Description |
|---|---|---|
| `RECONCILIATION` | `"RECONCILIATION"` | A column was reconciled against a service |
| `EXTENSION` | `"EXTENSION"` | One or more columns were extended |
| `MODIFICATION` | `"MODIFICATION"` | A column was modified |
| `PROPAGATE_TYPE` | `"PROPAGATE_TYPE"` | A cell annotation was propagated |
| `EXPORT` | `"EXPORT"` | The table was exported |
| `SAVE_TABLE` | `"SAVE_TABLE"` | The table was saved |
| `GET_TABLE` | `"GET_TABLE"` | The table was loaded |

`SAVE_TABLE` and `GET_TABLE` are **lifecycle markers** — they are logged but never assigned an `opNumber` and are excluded from the dependency graph nodes.

---

## Services

### `LoggerService` — plain-text logger

**Path:** `src/api/services/logger/logger.service.js`

Writes a single human-readable line per operation using `fs.appendFileSync`.

#### Log line format

```
[<ISO-timestamp>] -| OpType: <type> -| DatasetId: <id> -| TableId: <id> [-| ColumnName: <col>] [-| <ServiceLabel>: <service>] [-| AdditionalData: <json>]
```

Example:
```
[2025-05-10T14:32:01.123Z] -| OpType: RECONCILIATION -| DatasetId: 1 -| TableId: 3 -| ColumnName: country -| Reconciler: wikidata -| AdditionalData: {"serviceId":"wikidata"}
```

#### Public API

```js
LoggerService.logReconciliation({ datasetId, tableId, columnName, service, additionalData })
LoggerService.logExtension({ datasetId, tableId, columnName, service, additionalData })
LoggerService.logModification({ datasetId, tableId, columnName, service, additionalData })
LoggerService.logTypePropagation(datasetId, tableId, columnName, additionalData)
LoggerService.logExportTable(datasetId, tableId, format)
LoggerService.logSave({ datasetId, tableId, deletedCols })
LoggerService.logGetTable({ datasetId, tableId })
```

---

### `LoggerJsonService` — JSON Lines logger

**Path:** `src/api/services/logger/logger-json.service.js`

Writes one JSON object per line (JSON Lines / `.jsonl` format). This is the file read by `Log.js` to build the dependency graph.

#### Schema entry

The **first line** of every `.jsonl` file is a special schema entry written once when the file is created:

```json
{"type":"schema","datasetId":1,"tableId":3,"columns":["col1","col2"],"createdAt":"2025-05-10T14:00:00.000Z"}
```

It is never overwritten. All consumers skip lines where `type === "schema"`.

#### Operation entry

```json
{
  "id": "uuid-v4",
  "opNumber": 1,
  "timestamp": "2025-05-10T14:32:01.123Z",
  "operationType": "RECONCILIATION",
  "datasetId": "1",
  "tableId": "3",
  "columnName": "country",
  "reconciler": "wikidata",
  "additionalData": { "serviceId": "wikidata" }
}
```

Key fields:

| Field | Present when | Description |
|---|---|---|
| `id` | Always | UUID uniquely identifying this log entry |
| `opNumber` | Operations only (not `SAVE_TABLE`/`GET_TABLE`) | Incremental integer; computed as `max(existing opNumbers) + 1` |
| `columnName` | Reconciliation, extension, modification, type propagation | Target column |
| `reconciler` / `extender` / `modifier` | Service operations | Service identifier |
| `createdColumns` | Extension, modification | Columns created as a result of the operation |
| `deletedCols` | Save | Columns deleted during the save |
| `additionalData` | Service operations | Request body (with `items` stripped to keep logs small) |

#### Public API

Mirrors `LoggerService` exactly:

```js
LoggerJsonService.logReconciliation({ datasetId, tableId, columnName, service, additionalData })
LoggerJsonService.logExtension({ datasetId, tableId, columnName, service, additionalData, createdColumns })
LoggerJsonService.logModification({ datasetId, tableId, columnName, service, additionalData, createdColumns })
LoggerJsonService.logTypePropagation(datasetId, tableId, columnName, additionalData)
LoggerJsonService.logExportTable(datasetId, tableId, format)
LoggerJsonService.logSave({ datasetId, tableId, deletedCols })
LoggerJsonService.logGetTable({ datasetId, tableId })
```

---

## Middleware

### `logger-json.js`

**Path:** `src/api/middleware/logger-json.js`

Intercepts incoming requests and delegates to `LoggerJsonService` based on the matched URL pattern:

| URL pattern | Handler |
|---|---|
| `*/api/reconcilers/*` | `handleReconciliationRoute` |
| `*/api/extenders/*` | `handleExtenderRoute` |
| `*/api/modifiers/*` | `handleModificationRoute` |
| `PUT /api/dataset/:id/table/:id` | `handleSaveRoute` → `logSave` |
| `GET /api/dataset/:id/table/:id` | `handleSaveRoute` → `logGetTable` |
| `*/export*` | `handleExportOperation` |

For service operations (reconciliation, extension, modification) the log is written **after** the response is sent and **only on HTTP 2xx**. This is implemented by monkey-patching `res.json`.

#### `X-Table-Dataset-Info` header

The frontend must send this header on every service request:

```
X-Table-Dataset-Info: tableId:<id>;datasetId:<id>;columnName:<col>
```

The middleware parses it to extract the context needed to write the log entry. If the header is absent, the request is passed through without logging. Set the flag `skipLog=1` in this header to suppress logging for automated internal requests (e.g. redo-after-delete reconciliations).

### `dependencies.middleware.js`

**Path:** `src/api/middleware/dependencies.middleware.js`

After a service response is produced it injects a `dependencies` field into the JSON response body. This field is built by instantiating `Log` and calling `buildDependencyGraph()`, so it always reflects the state of the log **including** the operation that was just written.

---

## `Log` class — dependency graph

**Path:** `src/api/services/logger/Log.js`

Reads the `.jsonl` file and builds an in-memory graph of operation dependencies for a given *(dataset, table)* pair.

### Construction

```js
import { Log } from "../services/logger/Log.js";

const log = new Log(datasetId, tableId);
log.buildDependencyGraph();
```

The constructor synchronously parses the `.jsonl` file and applies the **consolidation window** heuristic (see below). Call `buildDependencyGraph()` afterwards to populate the graph nodes.

### Consolidation window

Operations are sliced from the log to include only the **current editing session**:

1. The file lines are reversed (newest first).
2. The first `SAVE_TABLE` entry is found → this is the last save point.
3. Lines up to the first `GET_TABLE` entry that follows it are kept.

Operations that fall outside this window are considered **non-consolidated** and are pruned from the log on the next table load by calling `pruneNonConsolidated()`.

### Graph structure

```
nodes = {
  root: { children: [...], parents: [...], supportChildren: [...], supportParents: [...] },
  "<opId>": { ... },
  ...
}
```

- **children / parents** — primary dependency edges (e.g. an extension built on a reconciled column).
- **supportChildren / supportParents** — secondary dependency edges from multi-column parameters (e.g. a modifier that reads from two columns).

### Key methods

| Method | Description |
|---|---|
| `buildDependencyGraph()` | Builds nodes from parsed operations sorted by `opNumber` |
| `getObject()` | Returns a plain object with `{ datasetId, tableId, columns, operationsCount, latestTableData, nodes, operations }` representing the whole log |
| `getDownstreamDependencies(opId)` | Returns all operation IDs that depend (directly or transitively) on `opId` |
| `pruneNonConsolidated()` | Deletes all non-consolidated operations from both log files |
| `deleteOperationsFromLog(opIds)` | Removes specific operations by ID from both the `.jsonl` and `.log` files |

### `LogJson` class

**Path:** `src/api/services/logger/LogJson.js`

A lighter read-only class that parses the `.jsonl` file and exposes the operations list. Used when the full dependency graph is not needed.

```js
import { LogJson } from "../services/logger/LogJson.js";

const log = new LogJson(datasetId, tableId);
await log.getOperations(); // returns parsed operation objects
```
---

## Maintenance guide

### Adding a new operation type

1. Add the constant to `OPERATION_TYPES` in both `logger.service.js` and `logger-json.service.js`.
2. Add a public static method (e.g. `logMyOperation`) to both services following the existing pattern.
3. Call both methods from the relevant controller or middleware. The two services must always be called together to keep the two files in sync.
4. If the new type should appear in the dependency graph, handle it inside `Log.js#appendOperationNode`. Otherwise add it to the `EXCLUDED_TYPES` list in `LoggerJsonService.#writeLog` so no `opNumber` is assigned.

### Adding a new route to log

1. Add a URL pattern constant to `ROUTE_PATTERNS` in `logger-json.js`.
2. Write a handler function (e.g. `handleMyRoute`) following the existing handlers.
3. Add a branch in `routeLogs` that calls your handler.
4. For routes where the log should be written only after a successful response, use `interceptResponse`.

### Deleting log files

Log files are plain files under `public/logs/`. They can be deleted manually when disk space is a concern. The system will recreate them automatically on the next operation. Deleting a `.jsonl` file resets the operation history for that table; the dependency graph will be empty on next load.

### Keeping files in sync

Always write to both `LoggerService` and `LoggerJsonService` for any new log point. The `.log` file is not the source of truth but is used by `deleteOperationsFromLog` to mirror deletions; if it drifts from the `.jsonl` file, deleted operations may reappear in the plain-text view.

:::caution
Never manually edit a `.jsonl` file unless you also update the `opNumber` values. The `opNumber` must remain unique and monotonically increasing; gaps are acceptable but duplicates will corrupt the dependency graph.
:::
