---
sidebar_position: 2
---

# Dataset handler

Datasets and tables are handled by the Dataset Service located in `/src/api/services/datasets/dataset.service.js`.
At the moment of writing, no real database exists and it is all handled on the local filesystem.

The local filesystem is based on two MongoDB collections which are handled with two **JSON** files:

- Dataset collection: `/public/datasets.info.json`
- Tables collection: `/public/tables.info.json`

Meanwhile dataset and tables files are organized in a hierarchical structure in `/public/datasets/[datasetId]/[tableId].json` where each json file corresponds to a table of dataset with id `datasetId`.

To facilitate the integration of new information for a dataset/table in the frontend interface, a **javascript object** describes how and which fields to show in the view.
This javascript object is located in `/src/api/services/datasets/dataset.service.js`:

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

Type corresponds to a UI componenent. Check here how to add new UI component. If **type** is omitted the field is treated as text.

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

Type corresponds to a UI componenent. Check here how to add new UI component. If **type** is omitted the field is treated as text.

:::