---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reconcilers
Reconcilers are services responsible for aligning or enriching tabular data with semantic metadata. They achieve this
by matching entities from the dataset with corresponding entries from external or internal knowledge sources, enabling
semantic linking and enhanced interoperability.

## In-Table Column Reconciler
Performs local reconciliation by matching values in a selected column against values in another column within the same
table, without calling any external API. This service allows users to establish internal semantic links between 
table columns.

- **Prefix selection**: choose a URI prefix (e.g., `wd`, `geo`) used to generate identifiers for matched values. The backend
  uses the selected prefix to obtain entity type and description metadata for the reference column’s values.
- **Reference column selection**: select the column whose values will be used to reconcile the selected column.

**Input**: one target column to reconcile and one reference column containing the target values.  
**Output**: local reconciliation links between matching cells, annotated with the selected URI prefix (e.g., `wd:`, `geo:`).

<Tabs>
<TabItem value="Input In-Table Column Reconciler" label="Input">

```js
req.original {
  items: [
    { id: 'country', label: 'country' },
    { id: 'r0$country', label: 'Barcelona' },
    { id: 'r1$country', label: 'Roma' },
  ], 
  props: {
    tableId: '15',
    datasetId: '0',
    columnName: 'country',
    prefix: 'geoCoord',
    columnToReconcile: {
      r0: ['41.3825,2.1769444444444', [], 'coordinates'],
      r1: ['41.893055555556,12.482777777778', [], 'coordinates'],
    }
  }
}

```
</TabItem>
<TabItem value="Output In-Table Column Reconciler" label="Output">

```js
response [
  { id: 'country', metadata: [] },
  { id: 'r0$country', metadata: 
    [
      {
        description: "Gothic Quarter"
        id: "geoCoord:41.3825,2.1769444444444"
        match: true
        name: "Barcelona"
        score: 1
        type: [ { id: "PPLX", name: "section of populated place" } ]
      }
    ]
  },
  { id: 'r1$country', metadata:
    [
      {
        description: "Roma Pallatina"
        id: "geoCoord:41.3825,2.1769444444444"
        match: true
        name: "Roma"
        score: 1
        type: [ { id: "PPLH", name: "historical populated place" } ]
      }
    ]
  },
]
```
</TabItem>
</Tabs>

## Geo Coordinates
### Geocoding with GeoNames
Performs geocoding by converting textual location mentions (e.g., cities, regions, countries) into geographic
coordinates using the GeoNames knowledge base. This service focuses on **spatial localization**, enriching each mention
with its corresponding latitude, longitude, and descriptive attributes.

- Data enrichment: annotations include GeoNames ID, coordinates (latitude, longitude), label, and description. 
- Contextual support: optional context columns (e.g., country, region) can be provided to disambiguate similar place names.

**Input**: textual mentions of locations, optionally supported by contextual columns.  
**Output**: W3C-compliant annotations linking cell values to geographic coordinates and entity metadata.

<Tabs>
<TabItem value="Input Geo Coordinates" label="Input Geo Coordinates">

```js
req.original {
  items: [
    { id: 'city', label: 'city' },
    { id: 'r0$city', label: 'Madrid' },
    { id: 'r1$city', label: 'Barcelona' }
  ],
  props: {
    tableId: '19',
    datasetId: '0',
    columnName: 'city',
    additionalColumns: { country: 
      [
        r0: ['Spain', [], 'country'],
        r1: ['Spain', [], 'country'],
      ]
    }
  }
}
```
</TabItem>
<TabItem value="Output Geo Coordinates" label="Output Geo Coordinates">

```js
response [
  { id: 'city', metadata: [] },
  { id: 'r0$city', metadata:
    [
      { 
        description: ""
        id: "geoCoord:40.4165,-3.70256"
        match: true
        name: "Madrid"
        score: 206.60902404785156
        type: [ { id: 'PPLC', name: 'capital of a political entity' } ]
      },
      { 
        description: ""
        id: "geoCoord:40.28419,-3.79415"
        match: false
        name: "Fuenlabrada"
        score: 61.976165771484375
        type: [ { id: 'PPLA3', name: 'seat of a third-order administrative division' } ]
      },
    ]
  },
  { id: 'r1$city', metadata:
    [
      {
        description: ""
        id: "geoCoord:41.38879,2.15899"
        match: true
        name: "Barcelona"
        score: 86.09076690673828
        type: [ { id: 'PPLA', name: 'seat of a first-order administrative division' } ]
      },
      {
        description: ""
        id: "geoCoord:41.38896,2.16179"
        match: false
        name: "Eixample"
        score: 29.53012466430664
        type: [ { id: 'PPLX', name: 'section of populated place' } ]
      },
    ]
  },
]
```
</TabItem>
</Tabs>

## GeoNames
Provides semantic reconciliation for geographic entities using the GeoNames knowledge base. Unlike the Geo Coordinates
service, this one focuses on entity linking rather than spatial localization, enriching the data with standardized
GeoNames IDs, labels, and descriptions, but not coordinates.

- Data enrichment: adds GeoNames identifiers, canonical labels, and textual descriptions. 
- Contextual support: optional context columns (e.g., region, country) can be used to refine entity matching.

**Input**: a column with geographic mentions (strings), optionally supplemented with contextual columns.  
**Output**: W3C-compliant annotations linking table cells to GeoNames entities and their metadata.

<Tabs>
<TabItem value="Input Geonames" label="Input Geonames">

```js
req.original {
  items: [
    { id: 'city', label: 'city' },
    { id: 'r0$city', label: 'Madrid' },
    { id: 'r1$city', label: 'Barcelona' }
  ],
  props: {
    tableId: '19',
    datasetId: '0',
    columnName: 'city',
    additionalColumns: { country: 
      [
        r0: ['Spain', [], 'country'],
        r1: ['Spain', [], 'country'],
      ]
    }
  }
}
```
</TabItem>
<TabItem value="Output Geonames" label="Output Geonames">

```js
response [
  { id: 'city', metadata:
    [
      {
        description: "anything that can be considered, discussed, or observed"
        id: "geo:Q35120"
        match: true
        name: "entity"
        score: 1
        property: []
        type: []
      },
    ]
  },
  { id: 'r0$city', metadata:
    [
      { 
        description: ""
        id: "geo:3117735"
        match: true
        name: "Madrid"
        score: 205.881103515625
        type: [ { id: 'PPLC', name: 'capital of a political entity' } ]
      },
      { 
        description: ""
        id: "geo:3114256"
        match: false
        name: "Parla"
        score: 61.931968688964844
        type: [ { id: 'PPLA3', name: 'seat of a third-order administrative division' } ]
      },
    ]
  },
  { id: 'r1$city', metadata:
    [
      {
        description: ""
        id: "geo:3128760"
        match: true
        name: "Barcelona"
        score: 86.07088470458984
        type: [ { id: 'PPLA', name: 'seat of a first-order administrative division' } ]
      },
      {
        description: ""
        id: "geo:6544100"
        match: false
        name: "Eixample"
        score: 29.519344329833984
        type: [ { id: 'PPLX', name: 'section of populated place' } ]
      },
    ]
  },
]
```
</TabItem>
</Tabs>

## Wikidata
### Linking with OpenRefine
It is a general-purpose reconciliation service that connects table values to Wikidata entities using the OpenRefine
reconciliation API. This service enriches the selected column with standardized identifiers, labels, and descriptions, supporting both cell-level and schema-level annotations.

- Data enrichment: annotations include Wikidata IDs, canonical labels, and descriptive metadata. 
- Scope: works with textual mentions in a column; external API calls are used to retrieve matching entities.

**Input**: one column containing mentions (strings) to reconcile.  
**Output**: W3C-compliant annotations linking table cells and schema headers to Wikidata entities.

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

### Linking with Alligator
It is a general-purpose reconciliation and linking service that uses Alligator to enrich table data with Wikidata
entities. This service annotates body cells (mentions) with IDs, labels, descriptions, and types, and schema/header
cells with types and properties.

- Data enrichment: adds Wikidata IDs, labels, descriptions, and types for body cells; types and properties for header cells. 
- Contextual support: users can optionally specify additional columns to improve disambiguation and reconciliation accuracy.

**Input**: one column containing mentions (strings) to reconcile, optionally supplemented with contextual columns.  
**Output**: W3C-compliant metadata associated with body and schema cells.

<Tabs>
<TabItem value="Input Alligator" label="Input Alligator">

```js
req.original {
  items: [
    { id: 'country', label: 'country' },
    { id: 'r0$country', label: 'Madrid' },
    { id: 'r1$country', label: 'Barcelona' },
  ],
  props: { tableId: '15', datasetId: '0', columnName: 'country' }
}

```
</TabItem>
<TabItem value="Output Alligator" label="Output Alligator">

```js
response [
  { id: 'city', metadata:
    [
      {
        description: "anything that can be considered, discussed, or observed"
        id: "geo:Q35120"
        match: true
        name: "entity"
        score: 1
        property: [
          {
            id: 'wdA:P131',
            name: 'located in the administrative territorial entity',
            obj: 'State',
            match: true,
            score: 100
          }
        ]
        type: [
          {
            match: false, 
            id: 'Q3257686', 
            name: 'locality', 
            score: 0.333
          },
          {
            match: false, 
            id: 'Q515', 
            name: 'city', 
            score: 0.333
          }
        ]
      },
    ]
  },
  { id: 'r0$city', metadata:
    [
      {
        description: "locality in Saskatchewan, Canada"
        features: [
          { id: 'delta', value: 0.018 },
          { id: 'omega', value: 0.036 }
        ]
        id: "wdA:Q115866504"
        match: false
        name: "Madrid"
        score: 0.064
        type: [ { id: 'Q3257686', name: 'locality' } ]
      },
      {
        description: "human settlement in Mexico"
        features: [
          { id: 'delta', value: null },
          { id: 'omega', value: null }
        ]
        id: "wdA:Q5638036"
        match: false
        name: "Madrid"
        score: 0.036
        type: [ { id: 'Q20202352', name: 'locality of Mexico' } ]
      },
    ]
  }, 
  { id: 'r1$city', metadata:
    [
      {
        description: "capital of Catalonia, Spain"
        features: [
          { id: 'delta', value: 0.009 },
          { id: 'omega', value: 0.027 }
        ]
        id: "wdA:Q1492"
        match: false
        name: "Barcelona"
        score: 0.054
        type: [
          { id: 'Q33146843', name: 'municipality of Catalonia' },
          { id: 'Q515', name: 'city' }
        ]
      },
      {
        description: "album by American jazz saxophonist Joe Henderson"
        features: [
          { id: 'delta', value: null },
          { id: 'omega', value: null }
        ]
        id: "wdA:Q30602738"
        match: false
        name: "Barcelona"
        score: 0.045
        type: [ { id: 'Q482994', name: 'album' } ]
      },
    ]
  },
]
```
</TabItem>
</Tabs>

### Linking with LionLinker
A reconciliation service that uses LionLinker to annotate table data. Body cells (mentions) are linked to Wikidata
entities, and schema/header cells can receive additional metadata.

- Data enrichment: adds Wikidata IDs, labels, descriptions, and types for body cells.
- Contextual support: users can optionally specify additional columns to improve disambiguation and reconciliation accuracy.

**Input**: one column containing mentions (strings) to reconcile, optionally supplemented with contextual columns.  
**Output**: W3C-compliant metadata associated with body and schema cells.

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>
