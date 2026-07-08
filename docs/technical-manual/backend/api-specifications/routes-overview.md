---
sidebar_position: 2
---

# API Routes Overview

All routes are served under the `/api` prefix (e.g. `GET /api/config`).

---

## Config

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/config` | Returns the UI configuration including enabled services |

---

## Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new local user |
| POST | `/api/auth/signin` | Sign in with local credentials |
| POST | `/api/auth/me` | Return the authenticated user's info (token-based) |
| POST | `/api/auth/verify` | Verify an auth token |
| GET | `/api/auth/users` | Search local users |
| GET | `/api/auth/keycloak/login` | Initiate Keycloak PKCE authorization redirect |
| GET | `/api/auth/keycloak/callback` | Handle Keycloak PKCE callback and exchange code for token |
| GET | `/api/auth/keycloak/me` | Return user info from the server-side Keycloak session cookie |
| GET | `/api/auth/keycloak/logout` | Clear server-side session and redirect to Keycloak end-session |

---

## Datasets

### Core CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dataset` | List all datasets |
| GET | `/api/dataset/search` | Search datasets |
| GET | `/api/dataset/:idDataset` | Get a dataset by ID |
| POST | `/api/dataset` | Create a new dataset |
| DELETE | `/api/dataset/:idDataset` | Delete a dataset |

### Tables

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dataset/:idDataset/table` | List all tables in a dataset |
| POST | `/api/dataset/:idDataset/table` | Add a table to a dataset |
| GET | `/api/dataset/:idDataset/table/:idTable` | Get a specific table |
| PUT | `/api/dataset/:idDataset/table/:idTable` | Update a table |
| DELETE | `/api/dataset/:idDataset/table/:idTable` | Delete a table |
| GET | `/api/dataset/:idDataset/table/:idTable/dependencies` | Get a table's upstream dependencies |

### Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dataset/:idDataset/table/:idTable/export` | Export a table (format via query param: w3c, rdf, csv, raw, report_md, python, notebook) |
| POST | `/api/dataset/:idDataset/table/:idTable/export` | Export a table (format/options via body) |

### Compliance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/dataset/:idDataset/table/:idTable/compliance` | Trigger a compliance check (async — result delivered via WebSocket) |
| GET | `/api/dataset/:idDataset/table/:idTable/compliance/:reportIndex` | Retrieve / export a compliance report |

The full list of compliance reports is not exposed as a dedicated endpoint — it is available inside the table object returned by `GET /api/dataset/:idDataset/table/:idTable` (field `complianceReports`).

#### `GET .../compliance/:reportIndex` details

`:reportIndex` accepts either a **zero-based integer** or the string **`latest`**.

The response format is controlled by the `format` query parameter:

| `?format` | Content-Type | Behaviour |
|-----------|-------------|-----------|
| *(omitted)* | `application/json` | Returns the raw report object as a downloadable JSON file |
| `md` | `text/markdown` | Returns a human-readable GDPR Compliance Report as a downloadable Markdown file |

### Operations (history)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dataset/:idDataset/table/:idTable/operation/:opId/downstream` | Get all operations downstream of a given operation |
| POST | `/api/dataset/:idDataset/table/:idTable/operation/:opId/redo` | Redo a deleted operation |
| DELETE | `/api/dataset/:idDataset/table/:idTable/operation/:opId` | Delete an operation from history |
| POST | `/api/dataset/track/:idDataset/:idTable` | Track a table (register for status updates) |

### Table locking

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/dataset/lock/:tableId/acquire` | Acquire an exclusive lock on a table |
| POST | `/api/dataset/lock/:tableId/release` | Release a previously acquired lock |
| POST | `/api/dataset/lock/:tableId/force-release` | Force-release a lock held by another session |

### Dataset ACL

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/dataset/:idDataset/acl` | Add a viewer/editor to a dataset (`role` in body) |
| DELETE | `/api/dataset/:idDataset/acl` | Remove a viewer/editor from a dataset (`role` in body) |
| POST | `/api/dataset/:idDataset/acl/visibility` | Set dataset visibility (`public` / `private`) |

### Table ACL

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dataset/:idDataset/table/:idTable/acl` | Get a table's ACL |
| POST | `/api/dataset/:idDataset/table/:idTable/acl` | Add a viewer/editor to a table (`role` in body) |
| DELETE | `/api/dataset/:idDataset/table/:idTable/acl` | Remove a viewer/editor from a table (`role` in body) |
| POST | `/api/dataset/:idDataset/table/:idTable/acl/visibility` | Set table visibility |

---

## Reconcilers

The reconciliation routes are mounted under `/api/reconcilers`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reconcilers/list` | List all available reconciliation services |
| POST | `/api/reconcilers/automatic/dataset/:idDataset/table/:idTable` | Trigger automatic annotation (Alligator or LLM classifier) |
| POST | `/api/reconcilers/:serviceId` | Reconcile table data with the specified service |

The `:serviceId` values correspond to the registered reconcilers:

| Service ID | Display name |
|------------|-------------|
| `asiaKeywordsMatcher` | ASIA (Keywords Matcher) |
| `asiaWikifier` | ASIA (Wikifier) |
| `atokaMatch2` | Atoka Match |
| `atokaPeople` | Atoka People |
| `geocodingGeonames` | Geocoding: Geo Coordinates (GeoNames) |
| `geocodingHere` | Geocoding: Geo Coordinates (HERE) |
| `geonames` | Linking: GeoNames (GeoNames) |
| `inTableLinker` | Linking: In-Table Linking |
| `lionLinker` | Linking: Wikidata (LionLinker) |
| `llmReconciler` | Custom (LLM Reconciler) |
| `llmReconcilerWikidata` | Custom Wikidata (LLM Reconciler) |
| `wikidataAlligator` | Linking: Wikidata (Alligator) |
| `wikidataOpenRefine` | Linking: Wikidata (OpenRefine) |

---

## Extenders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/extenders/list` | List all available extension services |
| POST | `/api/extenders/:serviceId` | Extend table data with the specified service |

The `:serviceId` values correspond to the registered extenders:

| Service ID | Display name |
|------------|-------------|
| `atokaPeopleExtender` | Atoka People Extender |
| `chMatching` | CH Matching - Private |
| `geoPropertiesWikidata` | Geo Properties (Wikidata) |
| `geoRouteHere` | Geo Route (HERE) |
| `geoRouteOSRM` | Geo Route (OSRM) |
| `llmClassifier` | COFOG (LLM Classifier) |
| `llmExtender` | Custom (LLM Extender) |
| `meteoPropertiesOpenMeteo` | Meteo Properties (OpenMeteo) |
| `reconciledColumnExt` | Annotation properties |
| `reconciledColumnExtWikidata` | Annotation properties (Wikidata) |
| `wikidataPropertySPARQL` | Wikidata properties (SPARQL) |
| `wikidataSPARQL` | SPARQL (Wikidata) |

---

## Modifiers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modifiers/list` | List all available modifier functions |
| POST | `/api/modifiers/:serviceId` | Apply a modifier to table data |

The `:serviceId` values correspond to the registered modifiers:

| Service ID | Display name |
|------------|-------------|
| `coordinateTruncation` | Coordinate Truncation Modifier |
| `dataCleaning` | Data Cleaning |
| `dateFormatter` | Date Formatter |
| `llmModifier` | Custom (LLM Modifier) |
| `pseudoanonymization` | Pseudoanonymization |
| `regexpModifier` | Regular Expression Modifier |
| `textColumnsTransformer` | Text to Columns / Columns to Text |
| `textRows` | Text to Rows |

---

## Suggestion

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/suggestion/wikidata` | Fetch Wikidata entity suggestions for a given query |

---

## Metadata

These routes proxy external knowledge-graph and geo services to retrieve entity details for display in the UI.

| Method | Endpoint | Query params | Description |
|--------|----------|-------------|-------------|
| GET | `/api/metadata/wikidata` | `id` (e.g. `wd:Q42`) | Fetch label, description and types from Wikidata |
| GET | `/api/metadata/lionlinker` | `id`, `label` | Fetch entity details from the LionLinker / LAM API |
| GET | `/api/metadata/geonames` | `id` (e.g. `geo:2643743`), `context` (`typeTab` to resolve feature codes) | Fetch place details from GeoNames |
| GET | `/api/metadata/geonamesCoordinates` | `id` (`lat,lng`) | Reverse-geocode coordinates via GeoNames |
| GET | `/api/metadata/osm` | `id` (coordinate pair `lat,lng` or OSM ref `type/id`) | Fetch place details from OpenStreetMap (Nominatim) |
