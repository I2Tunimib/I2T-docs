---
id: save-table-get-table-api
slug: /api/save-get-table
sidebar_position: 1
title: Save Table & Get Table API Data Format
---

# Save Table & Get Table API Data Format

This document describes how data is passed when calling the **Save Table** and **Get Table** endpoints in the I2T-backend API. Example payloads are provided based on the files in `sample_jsons/get_table_sample.json` and `sample_jsons/updateTable_sample.json`.

## Save Table

### Endpoint

```http
PUT /api/dataset/:datasetId/table/:tableId
```

### Request Headers

- `x-table-dataset-info`: Contains metadata in the format `tableId:<id>;datasetId:<id>;deletedCols:<col1,col2,...>`
- `Content-Type: application/json`

### Request Body Example

Here's an updated example including the `"rows"` data:

```json
{
  "tableInstance": {
    "id": "108",
    "idDataset": "4",
    "name": "table_2_1",
    "nCols": 7,
    "nRows": 20,
    "nCells": 140,
    "nCellsReconciliated": 65,
    "lastModifiedDate": "2025-07-10T07:52:14.580Z"
  },
  "columns": {
    "byId": {
      "Football Club": {
        "id": "Football Club",
        "label": "Football Club",
        "status": "pending",
        "context": {
          "wd": {
            "prefix": "wd:",
            "uri": "https://www.wikidata.org/entity/",
            "total": 20,
            "reconciliated": 4
          }
        },
        "metadata": [
          {
            "property": [
              {
                "id": "wd:P286",
                "obj": "Manager",
                "match": true,
                "name": "head coach",
                "score": 1
              },
              {
                "id": "wd:P634",
                "obj": "Team Captain",
                "match": true,
                "name": "captain",
                "score": 1
              },
              {
                "id": "wd:P5995",
                "obj": "Supplier",
                "match": true,
                "name": "kit supplier",
                "score": 1
              },
              {
                "id": "wd:P859",
                "obj": "Sponsor",
                "match": true,
                "name": "sponsor",
                "score": 1
              },
              {
                "id": "wd:P571",
                "obj": "Match Date",
                "match": true,
                "name": "inception",
                "score": 1
              }
            ]
          }
        ],
        "annotationMeta": {
          "annotated": true,
          "match": {
            "value": {
              "value": false
            }
          },
          "lowestScore": 81,
          "highestScore": 100
        },
        "kind": "entity",
        "role": "subject"
      }
    },
    "allIds": [
      "Football Club",
      "Manager",
      "Team Captain",
      "Supplier",
      "Main Sponsor",
      "Match Date",
      "Match Location"
    ]
  },
  "rows": {
    "byId": {
      "r0": {
        "id": "r0",
        "cells": {
          "Football Club": {
            "id": "r0$Football Club",
            "label": "Arsenal",
            "metadata": [
              {
                "name": {
                  "value": "Arsenal F.C.",
                  "uri": "https://www.wikidata.org/wiki/Q9617"
                },
                "id": "wd:Q9617",
                "description": "association football club in London, England",
                "match": false,
                "score": 100,
                "type": [
                  {
                    "id": "Q476028",
                    "name": "association football club"
                  }
                ]
              },
              {
                "name": {
                  "value": "FC Arsenal Kyiv",
                  "uri": "https://www.wikidata.org/wiki/Q44295"
                },
                "id": "wd:Q44295",
                "description": "professional football club based in Kyiv, Ukraine",
                "match": false,
                "score": 100,
                "type": [
                  {
                    "id": "Q476028",
                    "name": "association football club"
                  }
                ]
              },
              {
                "name": {
                  "value": "arsenal",
                  "uri": "https://www.wikidata.org/wiki/Q81669"
                },
                "id": "wd:Q81669",
                "description": "place for arms and ammunition",
                "match": false,
                "score": 100,
                "type": []
              }
            ],
            "annotationMeta": {
              "annotated": true,
              "match": {
                "value": false
              },
              "lowestScore": 100,
              "highestScore": 100
            }
          }
        }
      }
    },
    "allIds": [
      "r0",
      "r1",
      "r2",
      "r3",
      "r4",
      "r5",
      "r6",
      "r7",
      "r8",
      "r9",
      "r10",
      "r11",
      "r12",
      "r13",
      "r14",
      "r15",
      "r16",
      "r17",
      "r18",
      "r19"
    ]
  }
}
```

- The `tableInstance` field contains metadata about the table.
- The `columns.byId` field contains column definitions and metadata.

## Get Table

### Endpoint

```
GET /api/dataset/:datasetId/table/:tableId
```

### Request Headers

- `x-table-dataset-info`: Contains metadata in the format `tableId:<id>;datasetId:<id>`

### Response Body Example

```json
{
  "table": {
    "id": "108",
    "idDataset": "4",
    "name": "table_2_1",
    "nCols": 7,
    "nRows": 20,
    "nCells": 140,
    "nCellsReconciliated": 63,
    "lastModifiedDate": "2025-06-16T09:13:03.016Z"
  },
  "columns": {
    "Football Club": {
      "id": "Football Club",
      "label": "Football Club",
      "status": "pending",
      "context": {
        "wd": {
          "prefix": "wd:",
          "uri": "https://www.wikidata.org/entity/",
          "total": 20,
          "reconciliated": 2
        }
      },
      "metadata": [
        {
          "property": [
            {
              "id": "wd:P286",
              "obj": "Manager",
              "match": true,
              "name": "head coach",
              "score": 1
            },
            {
              "id": "wd:P634",
              "obj": "Team Captain",
              "match": true,
              "name": "captain",
              "score": 1
            },
            {
              "id": "wd:P5995",
              "obj": "Supplier",
              "match": true,
              "name": "kit supplier",
              "score": 1
            },
            {
              "id": "wd:P859",
              "obj": "Sponsor",
              "match": true,
              "name": "sponsor",
              "score": 1
            }
          ]
        }
      ]
    }
  },
  "rows": {
    "r0": {
      "id": "r0",
      "cells": {
        "Football Club": {
          "id": "r0$Football Club",
          "label": "Arsenal",
          "metadata": [
            {
              "name": {
                "value": "Arsenal F.C.",
                "uri": "https://www.wikidata.org/wiki/Q9617"
              },
              "id": "wd:Q9617",
              "description": "association football club in London, England",
              "match": false,
              "score": 100,
              "type": [
                {
                  "id": "Q476028",
                  "name": "association football club"
                }
              ]
            }
          ],
          "annotationMeta": {
            "annotated": true,
            "match": {
              "value": false
            },
            "lowestScore": 100,
            "highestScore": 100
          }
        }
      }
    }
    // ...other rows...
  },
  "allIds": [
    "r0",
    "r1",
    "r2",
    "r3",
    "r4",
    "r5",
    "r6",
    "r7",
    "r8",
    "r9",
    "r10",
    "r11",
    "r12",
    "r13",
    "r14",
    "r15",
    "r16",
    "r17",
    "r18",
    "r19"
  ]
}
```

- The `table` field contains metadata about the table.
- The `columns` field contains column definitions and metadata.

## Notes

- The `x-table-dataset-info` header is required for logging and tracking operations.
- The `deletedCols` field is only relevant for the Save Table operation.
- All data is passed as JSON.

## Differences Between Save Table and Get Table Example Files

The sample files for Save Table (`updateTable_sample.json`) and Get Table (`get_table_sample.json`) have some important structural differences:

### 1. Top-level Structure

- **Get Table (`get_table_sample.json`):**
  - The main table object is under the key `"table"`.
  - Columns are under `"columns"`.
- **Save Table (`updateTable_sample.json`):**
  - The main table object is under the key `"tableInstance"`.
  - Columns are under `"columns.byId"`.

### 2. Table Object

- **Get Table:**
  - `"table"` contains properties like `id`, `idDataset`, `name`, `nCols`, `nRows`, `nCells`, `nCellsReconciliated`, `lastModifiedDate`.
- **Save Table:**
  - `"tableInstance"` contains similar properties, but values may be updated (e.g., `nCellsReconciliated`, `lastModifiedDate`).

### 3. Columns

- **Get Table:**
  - `"columns"` is a flat object with column names as keys.
- **Save Table:**
  - `"columns"` contains a `"byId"` object, which then has column names as keys.

### 4. Data Differences

- The actual data (e.g., number of reconciliated cells, last modified date) may differ between the two files, reflecting the state before and after a save operation.

### 5. Usage

- **Get Table** is used to retrieve the current state of a table and its columns.
- **Save Table** is used to update the table, and the structure is slightly more nested to support updates.

For more details, see the sample files in `I2T-backend/sample_jsons/`:

- `get_table_sample.json`
- `updateTable_sample.json`
