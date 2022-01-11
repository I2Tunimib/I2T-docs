---
sidebar_position: 4
---

# Dataset handler

Tables are organized in a hierarchical
structure composed of datasets that are directories containing one or more
tables. This structure makes it possible to better organize tables for the
users, but also enabling STI approaches that work with a group of tables
(e.g.: Mantis Table is able to obtain better annotation results using multiple
tables at the same time).

The access, creation, update, deletion, and search of tables is handled by
a software layer denominated Datasets and Tables handler. The objective of
this layer is to provide an interaction between an API functionality and the
store of tables informations. When a new table is uploaded to the server,
it is parsed to an internal format so that it can be easier treated by the
application. Once converted, it is then stored on the server. The internal
format is never exposed to the user because it isn’t useful for any other
application, instead, if the user requires the data of a table, it is parsed
to one of the available formats. At the moment, tables informations aren’t
stored in a real database, instead the file system of the server is used. Tables
are directly stored in the datasets stucture, while their meta information
(e.g.: id, table name, last modfied data) are maintained in two MongoDB
collections-like structures using JSON files. For this reason, the layer is
called with a generic name "handler", because it can be modified, to include
a connection to real a database, so that those operations can be more efficient
and performant.

## Datasets and tables collections

Datasets and tables are handled by the Dataset Service located in `/src/api/services/datasets/dataset.service.js`.
At the moment of writing, no real database exists and it is all handled on the local filesystem.

The local filesystem is based on two MongoDB collections which are handled with two **JSON** files:

- Dataset collection: `/public/datasets.info.json`
- Tables collection: `/public/tables.info.json`

For example a dataset entry for the `datasets.info.json` looks like the following:
```json
  "42": {
    "id": "42",
    "name": "Round4_2020",
    "description": "Dataset from Semtab 2020",
    "mentions": 486847,
    "nTables": 49,
    "lastModifiedDate": "2021-12-09T16:58:39.655Z",
    "mantisDatasetName": "VajQkEFp_UH1Bg61dAocF",
    "mantisId": 3
  }
```

A table entry for the `tables.info.json` looks like the following:
```json
  "90": {
    "id": "90",
    "idDataset": "42",
    "name": "0A4KYJH5",
    "nCols": 3,
    "nRows": 20,
    "nCells": 60,
    "nCellsReconciliated": 40,
    "lastModifiedDate": "2021-12-09T17:02:25.949Z",
    "mantisId": 0,
    "mantisStatus": "DONE"
  }
```

Dataset and tables files are then organized in a hierarchical structure in `/public/datasets/[datasetId]/[tableId].json` where each json file corresponds to a table of dataset with id `datasetId`. By considering the bow examples the following path would exist: `/public/datasets/42/90.json`.

## Mapping dataset/table fields to UI views

In the future, the data returned from a GET endpoint for a dataset or a table could change: some data could be removed, some data could be added, or some data could be modified. To facilitate those changes two javascript objects describe which data fields should be rendered and how they should be rendered in the frontend application.

The data fields for both dataset and table entries are described by two javascript objects located in `/src/api/services/datasets/dataset.service.js`:

```js
const COLLECTION_DATASETS_MAP = {
  name: {
    label: 'Name',
    // type: 'date' | 'percentage' | 'tag'
  },
  description: {
    label: 'Description'
  },
  nTables: {
    label: 'N. Tables'
  },
  mentions: {
    label: 'N. Mentions'
  },
  lastModifiedDate: {
    label: 'Last Modified',
    type: 'date'
  }
}
```

:::info

`Type` corresponds to a UI componenent. Check [here](/frontend/dashboard-components.md) how to add new UI component. If `type` is omitted the field is treated as text. The data fields included
in the object will be displayed in the UI, meanwhile all others fields are left out of the visualization.

:::

```js
const COLLECTION_TABLES_MAP = {
  name: {
    label: 'Name'
  },
  nCols: {
    label: 'N. Cols'
  },
  nRows: {
    label: 'N. Rows'
  },
  completion: {
    label: 'Completion',
    type: 'percentage'
  },
  lastModifiedDate: {
    label: 'Last Modified',
    type: 'date'
  }
}
```

:::info

`Type` corresponds to a UI componenent. Check [here](/frontend/dashboard-components.md)  how to add new UI component. If `type` is omitted the field is treated as text. The data fields included
in the object will be displayed in the UI, meanwhile all others fields are left out of the visualization.

:::