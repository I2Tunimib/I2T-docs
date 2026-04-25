---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Modifiers
Modifiers are services that process and transform data at the column level. They are typically used to perform
operations such as formatting, normalization, anonymization, or restructuring of table data. Each modifier defines a
specific transformation logic that can either update existing values or generate new columns based on user-defined parameters.

## Data Cleaning
Performs text normalization and cleanup operations on the selected column(s). This modifier allows users to standardize
textual content and remove unwanted characters through basic string transformations, such as:
- Trimming whitespace
- Removing special characters (e.g., @, #, !)
- Normalizing accents and diacritics (e.g., é → e)
- Converting to lowercase, uppercase, titlecase

**Input**: one or more selected columns  
**Output**: updated column(s) values

<Tabs>
<TabItem value="Input Data Cleaning" label="Input Data Cleaning">

```js
req.original {
  items: {
    country: {
      r0: [ 'Madrid', [], 'country' ],
      r1: [ 'Barcelona', [], 'country' ],
    }
  },
  props: {
    operationType: 'toUppercase',
    joinColumns: false,
    selectedColumns: [ 'country' ],
    columnType: 'unknown'
  },
}
```
</TabItem>
<TabItem value="Output Data Cleaning" label="Output Data Cleaning">

```js
response {
  r0: { label: 'MADRID', metadata: [] },
  r1: { label: 'BARCELONA', metadata: [] },
}
```
</TabItem>
</Tabs>

## Date Formatter
Converts date-like values in the selected column(s) into a standardized or custom date formats using **date-fns** library
for parsing and formatting. This modifier dynamically adapts the form parameters based on the detected column type
(date, time, datetime, or unknown). Users can:
- Select a **predefined format** or define a **custom** one using supported tokens (see the “?” help tooltip).
- Optionally **join** the column with another and specify the **separator** to use.
- Choose whether to **overwrite** existing values or **create** a new column.
- Define the desired **level of detail** in the formatted output. For example, when using the ISO 8601 format, available
  levels of detail extend up to `yyyy-MM-dd'T'HH:mm:ssXXX`.
  - For datetime or time columns, this setting applies only to the time component.
- Optionally **split a datetime column** into separate date and time columns.

**Input**: one or more selected columns  
**Output**: updated or newly created formatted columns

<Tabs>
<TabItem value="Date Formatter Join" label="Input Date Formatter Join">

```js title="Input Join"
req.original {
  items: {
    dateA: {
      r0: ['20210112', [], 'dateA'],
      r1: ['20210112', [], 'dateA'],
    }
  },
  props: {
    formatType: 'iso',
    columnToJoin: {
      r0: [ '15:33:22', [], 'hourA' ],
      r1: [ '15:33:22', [], 'hourA' ],
    },
    detailLevel: 'hourSecondsUTC',
    outputMode: 'create',
    joinColumns: false,
    selectedColumns: [ 'dateA' ],
    columnType: 'date'
  },
}
```

```js title="Output Join"
response {
  columns: {
    dateA_hourA: {
      label: 'dateA_hourA',
      kind: 'literal',
      metadata: [],
      cells: [
        r0: { label: '2021-01-12T15:33:22Z', metadata: [] },
        r1: { label: '2021-01-12T15:33:22Z', metadata: [] },
      ],
    }
  },
  meta: {}
}
```
</TabItem>
<TabItem value="Date Formatter Split" label="Input Date Formatter Split">

```js title="Input Split"
req.original {
  items: {
    datetime: {
      r0: [ '20251016 15:33:22', [], 'datetime' ],
      r1: [ '20251016 15:33:22', [], 'datetime' ],
    }
  },
  props: {
    formatType: 'us',
    detailLevel: 'hourSecondsUTC',
    outputMode: 'create',
    joinColumns: false,
    selectedColumns: [ 'datetime' ],
    columnType: 'datetime',
    splitDatetime: true,
  }
}
```

```js title="Output Split"
response {
  columns: {
    date: {
      label: 'date',
      kind: 'literal',
      metadata: [],
      cells: [
        r0: { label: '10/16/2025', metadata: [] },
        r1: { label: '10/16/2025', metadata: [] },
      ],
    },
    time: {
      label: 'time',
      kind: 'literal',
      metadata: [],
      cells: [
        r0: { label: '03:33 PM', metadata: [] },
        r1: { label: '03:33 PM', metadata: [] },
      ],
    },
  },
  meta: {}
}
```
</TabItem>
</Tabs>

## Pseudoanonymization
Applies a data transformation to pseudoanonymize or de-anonymize the values in the selected column(s), using the
**counteR-pseudonymization-tool** for encryption and decryption. This modifier allows users to protect sensitive information
by replacing original data with encrypted identifiers (vault keys), or to restore the original values.

**Input**: one or more selected columns  
**Output**: new column(s) containing pseudoanonymized or de-anonymized values

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```

```js title="Output Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Input De-anonymize"
...
```

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## Text to columns / Column to text
Performs bidirectional transformations between textual columns, allowing users to either split a single column into
multiple ones or join multiple columns into a single textual column, based on a user-defined separator.
- **Join operation**: users select two or more columns to merge, define a separator, and optionally specify a custom name
  for the resulting column. If no name is provided, a default name following the pattern `col1_col2` is automatically
  assigned. 
- **Split operation**: users define a separator used to divide the text in the selected column into multiple new columns. 
  The resulting columns are automatically named following the pattern `columnName_1`, `columnName_2`, etc.

**Input**: one selected column (for split) or multiple columns (for join)  
**Output**: new column(s) containing the split values or the joined text

<Tabs>
<TabItem value="Join" label="Join">

```js title="Input Join"
req.original {
  items: {
    city: {
      r0: [ 'Madrid', [], 'country' ],
      r1: [ 'Barcelona', [], 'country' ],
    }
  },
  props: {
    operationType: 'joinOp',
    columnToJoinSplit: { 
      country: { 
        r0: [ 'Spain', [], 'country' ],
        r1: [ 'Spain', [], 'country' ] 
      }
    },
    separator: ', ',
    renameNewColumn: 'location',
    joinColumns: false,
    selectedColumns: [ 'city' ],
    columnType: 'unknown'
  }
}
```

```js title="Output Join"
response {
  r0: { label: 'Madrid, Spain', metadata: [] },
  r1: { label: 'Barcelona, Spain', metadata: [] },
}
```
</TabItem>
<TabItem value="Split" label="Split">

```js title="Input Split"
req.original {
  items: {
    location: {
      r0: { label: 'Madrid, Spain', metadata: [] },
      r1: { label: 'Barcelona, Spain', metadata: [] },
    }
  },
  props: {
    operationType: 'splitOp',
    columnToJoinSplit: {},
    separator: ', ',
    joinColumns: false,
    selectedColumns: [ 'location' ],
    columnType: 'unknown'
  }
}
```

```js title="Output Split"
response {
  columns: {
    location_1: {
      label: 'location_1', 
      kind: '',
      metadata: [],
      cells: [
        r0: { label: 'Madrid', metadata: [] },
        r1: { label: 'Barcelona', metadata: [] },
      ],
    },
    location_2: {
      label: 'location_2',
      kind: '',
      metadata: [],
      cells: [
        r0: { label: 'Spain', metadata: [] },
        r1: { label: 'Spain', metadata: [] },
      ],
    },
  },
  meta: {}
}
```
</TabItem>
</Tabs>
