---
sidebar_position: 8
---

# Permission System

The I2T system implements a **two-level hierarchical permission model** where datasets and tables have independent ACLs, with a **most-restrictive-wins** enforcement strategy.

---

## Data Model

### Dataset ACL

```jsonc
{
  "id": "42",
  "userId": "1",              // owner (can manage ACL)
  "name": "My Dataset",
  "visibility": "private",    // "private" | "public"
  "viewers": ["5", "6"],      // user IDs with read-only access
  "editors": ["3", "4"]       // user IDs with read-write access
}
```

### Table ACL

```jsonc
{
  "id": "7",
  "idDataset": "42",
  "name": "My Table",
  "visibility": "private",    // "private" | "public" | null (inherit)
  "viewers": ["5"],           // user IDs with read-only access
  "editors": []               // user IDs with read-write access
}
```

### Constraints

- `visibility: null` on a table means "inherit from dataset" (no override)
- `visibility: "public"` on a table is **rejected if the dataset is `"private"`**
- Only users with system role `"editor"` or `"admin"` can be assigned as editors
- Only the dataset owner (user matching `dataset.userId`) can modify any ACL

---

## Access Control Helpers

### `userHasViewAccess(dataset, userId)`

Returns `true` if the user can view the dataset:

```
owner OR (public) OR (in viewers list) OR (in editors list)
```

### `userHasEditAccess(dataset, userId)`

Returns `true` if the user can edit the dataset:

```
owner OR (public) OR (in editors list)
```

### `tableUserHasViewAccess(dataset, table, userId)`

Returns `true` if the user can view the table. Applies the most-restrictive rule:

```
IF dataset access is denied
  DENY
IF table has no ACL (visibility = null)
  ALLOW (if dataset view access granted)
IF table visibility = "public"
  ALLOW (if dataset view access granted)
IF table visibility = "private"
  ALLOW IF (in table viewers OR in table editors)
```

### `tableUserHasEditAccess(dataset, table, userId)`

Returns `true` if the user can edit the table. Applies the most-restrictive rule:

```
IF dataset edit access is denied
  DENY
IF table has no ACL (visibility = null)
  ALLOW (if dataset edit access granted)
IF table visibility = "public"
  ALLOW (if dataset edit access granted)
IF table visibility = "private"
  ALLOW IF (in table editors only)
```

**Note:** Viewers cannot edit, even if they have edit access elsewhere.

---

## API Endpoints

### Dataset ACL

| Method | Path | Action | Auth |
|---|---|---|---|
| `POST` | `/dataset/:id/acl/visibility` | Set dataset visibility | Owner only |
| `POST` | `/dataset/:id/acl/viewers` | Add viewer to dataset | Owner only |
| `DELETE` | `/dataset/:id/acl/viewers` | Remove viewer from dataset | Owner only |
| `POST` | `/dataset/:id/acl/editors` | Add editor to dataset | Owner only |
| `DELETE` | `/dataset/:id/acl/editors` | Remove editor from dataset | Owner only |

### Table ACL

| Method | Path | Action | Auth |
|---|---|---|---|
| `GET` | `/dataset/:id/table/:tid/acl` | Fetch table ACL (with dataset owner info) | View access required |
| `POST` | `/dataset/:id/table/:tid/acl/visibility` | Set table visibility | Owner only |
| `POST` | `/dataset/:id/table/:tid/acl/viewers` | Add viewer to table | Owner only |
| `DELETE` | `/dataset/:id/table/:tid/acl/viewers` | Remove viewer from table | Owner only |
| `POST` | `/dataset/:id/table/:tid/acl/editors` | Add editor to table | Owner only |
| `DELETE` | `/dataset/:id/table/:tid/acl/editors` | Remove editor from table | Owner only |

---

## Enforcement Points

### Controller Level

Every route that accesses a dataset or table performs two checks:

```js
// For dataset operations
const user = await AuthService.verifyToken(req);
const dataset = await DatasetsService.findOneDataset(datasetId);
if (!DatasetsService.userCanView(dataset, user.id))
  return res.status(401).json({});

// For table operations (additional check)
const table = await DatasetsService.findOneTable(datasetId, tableId);
if (!DatasetsService.tableUserCanView(dataset, table, user.id))
  return res.status(401).json({});
```

### Guarded Operations

| Operation | View check | Edit check |
|---|:---:|:---:|
| `GET /dataset/:id` | ✅ | — |
| `GET /dataset/:id/table` | ✅ | — |
| `GET /dataset/:id/table/:tid` | ✅ | ✅ |
| `PUT /dataset/:id/table/:tid` | — | ✅ |
| `DELETE /dataset/:id` | — | ✅ |
| `DELETE /dataset/:id/table/:tid` | — | ✅ |
| `POST /dataset/:id/table/:tid/acl/*` | — | Owner only |

### Validation: Most-Restrictive Rule

In `setTableVisibility()`:

```js
// Enforce: table cannot be public if dataset is private
if (visibility === "public" && dataset.visibility === "private")
  throw new Error(
    "Cannot set table to public when dataset is private. " +
    "The most restrictive permission (dataset private) always wins."
  );
```

---

## Service Methods

### `addTableViewer(datasetId, tableId, targetUserId, actingUser)`

Adds a user to the table's viewers list.

**Validation:**
- `actingUser` must be the dataset owner
- `targetUserId` must exist in the users database
- If this is the first viewer/editor, table visibility is auto-set to `"private"`

**Returns:** Updated table metadata

### `addTableEditor(datasetId, tableId, targetUserId, actingUser)`

Adds a user to the table's editors list.

**Validation:**
- `actingUser` must be the dataset owner
- `targetUserId` must have system role `"editor"` or `"admin"`
- If this is the first viewer/editor, table visibility is auto-set to `"private"`

**Returns:** Updated table metadata

### `setTableVisibility(datasetId, tableId, visibility, actingUser)`

Sets the table's visibility.

**Validation:**
- `actingUser` must be the dataset owner
- `visibility` must be `"private"`, `"public"`, or `null`
- Cannot be `"public"` if dataset is `"private"`

**Behavior:**
- If set to `null` (inherit), viewers and editors lists are cleared

**Returns:** Updated table metadata

---

## Frontend Integration

### Permission Check on Mount

When the table viewer loads (`Viewer.tsx`), it:

1. Fetches the dataset info
2. Checks `userCanEdit(dataset, user.id)` for dataset-level permission
3. Fetches the table ACL via `getTableAcl(datasetId, tableId)`
4. Checks `tableUserCanEdit(dataset, table, user.id)` for combined permission
5. Sets `isViewOnly = !canEdit` in Redux state

All edit controls subscribe to this state and disable themselves if `isViewOnly = true`.

### UI Constraints

- **Access button** shown only to dataset owner in table list
- **TableAclDialog**: "Public" radio button disabled if dataset is private, with a warning banner
- **Edit controls**: All disabled when `isViewOnly = true`

---

## Examples

### Scenario: Public Dataset with Private Table

```js
// Dataset
{ visibility: "public", viewers: [], editors: [] }

// Table
{ visibility: "private", viewers: ["user5"], editors: [] }

// Access for user5:
tableUserCanView(dataset, table, "user5")    // true
tableUserCanEdit(dataset, table, "user5")    // false (is viewer)

// Access for user2 (not listed):
tableUserCanView(dataset, table, "user2")    // false (not in table viewers)
tableUserCanEdit(dataset, table, "user2")    // false
```

### Scenario: Private Dataset with Mixed Table Access

```js
// Dataset
{ visibility: "private", viewers: ["user2"], editors: ["user3"] }

// Table A (inherit)
{ visibility: null, viewers: [], editors: [] }

// Table B (private with specific access)
{ visibility: "private", viewers: ["user2"], editors: ["user3"] }

// Access for user2 to Table B:
userHasViewAccess(dataset, "user2")          // true (dataset viewer)
tableUserCanEdit(dataset, tableB, "user2")   // false (not table editor)

// Access for user3 to Table B:
userHasEditAccess(dataset, "user3")          // true (dataset editor)
tableUserCanEdit(dataset, tableB, "user3")   // true (table editor)
```

---

## Related

- [REST API](./rest-api.md) — Full API specification
- [Architecture](./architecture.md) — System design overview
