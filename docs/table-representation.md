---
sidebar_position: 6
---

# Exchanged Data Format
In the following section are described the data formats exchanged between client and server for reconciliation and extension requests. The descriptions is presented in Typescript.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Annotation Metadata
The annotation data is modeled following the **W3C standard format** for the representation of semantic annotations:

```ts title="Annotation metadata"
interface ColumnMetadata = {
  type?: { id: string; name: string; }[];
  property?: { 
    id: string; 
    name: string; 
    obj: string; 
    score: number; 
    match: boolean;
  }[];
  entity?: EntityMetadata[];
}

interface EntityMetadata = {
  id: string;
  match: boolean;
  name: string;
  score: number;
  type?: { id: string; name: string }[];
  description?: string;
}
```

## Reconciliation

### Request
The **req** object of a **requestTransformer** contains the original request from the client and *optionally* the processed request (see [External services aggregator](/backend/services-aggregator.md)):

<Tabs>
<TabItem value="original" label="Request (original)">

```ts
interface ReconciliationRequestOriginal {
  // items to reconcile
  items: Item[];
}

interface Item {
  // cell id
  id: string;
  // label to reconcile
  label: string;
}
```

</TabItem>

<TabItem value="processed" label="Request (processed)">

```ts
interface ReconciliationRequestProcessed {
  // items to reconcile as map where
  // the key is the label to reconcile
  // and the array contains the ids of the cells with the same label
  items: Record<string, string[]>;
}

```

</TabItem>

</Tabs>

### Response

```ts
type ReconciliationResponseProcessed = Item[];

interface Item {
  // cell id
  id: string;
  // candidate entity annotations
  metadata?: EntityMetadata[];
}
```

## Extension

### Request
The **req** object of a **requestTransformer** contains the original request from the client and *optionally* the processed request (see [External services aggregator](/backend/services-aggregator.md)):

<Tabs>
<TabItem value="original" label="Request (original)">

```ts
interface ExtensionRequestOriginal {
  // items to extend. columnId: { rowId: metadataId }
  items: Record<string, Item>;
  // any properties that may be required by the service
  [serviceProperty]?: any;
}

type Item = {
  // rowId: metadataId
  [rowId]: string;
}
```

</TabItem>

<TabItem value="processed" label="Request (processed)">

```ts
interface ExtensionRequestProcessed {
  // items to extend as a map
  // columnId: { metadataId: [row1, row2, ...] }
  items: Record<string, Item>;
}

type Item = {
  // metadataId: [row1, row2,...]
  [metadataId]: string[];
}

```

</TabItem>

</Tabs>

### Response

```ts
interface ExtensionResponseProcessed = {
  // columns to add
  columns: Record<string, Column>;
  // map between extended column and original column ids
  meta: Record<string, string>;
};

interface Column {
  label: string;
  metadata?: ColumnMetadata[];
  kind?: 'entity' | 'literal';
  role?: 'sbj' | 'obj';
  cells: Record<string, Cell>;
}

interface Cell = {
  label: string;
  metadata?: EntityMetadata[];
}
```