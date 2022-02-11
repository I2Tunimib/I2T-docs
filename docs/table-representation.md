---
sidebar_position: 6
---

# Table format

Table representation described in Typescript. You can find an example of the representation [here](https://drive.google.com/file/d/1O9As0tNSxmGu7MKCjNo-bx0Sdrrx7vi6/view?usp=sharing).

```ts
interface Table {
  columns: Record<ID, Column>;
  rows: Record<ID, Row>
}
```

```ts
// a column cell entity
interface Column {
  // id of a column
  id: ID; 
  // displayed label
  label: string;
  // status for the column. 
  // reconciliated: all cells are reconciled with matching annotation
  // pending: there are annotations for some of the cells, but they are not reconciled partially
  // empty: the column cells have no annotations 
  status: 'reconciliated' | 'pending' | 'empty',
  // annotation context for the column cells
  // ID is the prefix of the KG (e.g.: geo, dbp, wk)
  context: Record<ID, Context>;
  // metadata describing the annotations for the column
  metadata?: ColumnMetadata[];
  // information about the annotations
  annotationMeta?: AnnotationMeta;
  // type of the column: 'entity', 'literal'
  kind?: string;
  // role of the column: 'sbj', 'obj'
  role?: string;
}
```

```ts
// a row entity
interface Row {
  // id of the row: r0, r1, r2...
  id: ID;
  // cells for the row
  cells: Record<ID, Cell>
}
```

```ts
// a row cell entity
interface Cell {
  // id of the cell: r0$c0, r0$c1...
  // the sign '$' separates the id of the row from the id of the column
  id: ID;
  // displayed label
  label: string;
  // metadata describing the annotations for the cell
  metadata?: BaseMetadata[];
  // information about the annotations
  annotationMeta?: AnnotationMeta;
}
```

```ts
// column context
interface Context {
  // base uri to the knowledge graph resource, e.g.: "https://www.wikidata.org/entity/"
  uri: string;
  // total number of annotated cells with this context
  total: number;
  // total number of reconciled cells for this context
  reconciliated: number;
}
```

```ts
// metadata
interface BaseMetadata {
  // metadata id, i.e.: resource id (e.g.: "wd:Q960648")
  id: ID;
  // metadata name
  name: {
    value: string;
    uri: string;
  };
  match: boolean;
  score: number;
  type?: BaseMetadata[];
}
```

```ts
// metadata describing Column Metadata
interface ColumnMetadata {
  type?: BaseMetadata[];
  property?: PropertyMetadata[];
  entity?: BaseMetadata[];
}
```

```ts
// metadata describing columns properties
interface PropertyMetadata extends BaseMetadata {
  //...BaseMetadata (inherits all data fields of BaseMetadata)
  // object of the property
  obj?: ID;
}
```

```ts
// annotation information
interface AnnotationMeta {
  // if true the cell has been annotated
  annotated?: boolean;
  // describes if the cell has a matching entity annotation
  match: {
    value: boolean;
    // what caused to assign the true match
    reason?: 'reconciliator' | 'manual' | 'refinement'
  };
  // highest score between entity annotations
  highestScore: number;
  // lowest score between entity annotations
  lowestScore: number;
}
```