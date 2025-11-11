---
sidebar_position: 6
---

# How to add a new Service

Many services might be available to perform operations required for the Semantic Enrichment of a table. For example,
multiple services can provide their own logic to perform a STI approach and generate annotations for a given table.
Some other services might operate only on some of the annotation levels, i.e.: reconciliators that provide instance-level
annotations for the table cells, or reconciliators that work on the schema-level annotation of the table, 
mapping columns to ontology concepts, determine the subject, named-entity, or literal column, or finding
relations between pairs of columns.

The Service Aggregator Layer is designed so that new external services can be easily integrated by developers,
following the framework’s structure and conventions.

## Service Structure

Services are situated in the `services` folder at the root of the application. They are grouped by their core functionality. At the moment there are services of types `reconciliator` and `extender`. Each service is composed of three components:

```jsx title="Service structure"
📦serviceId
 ┣ 📜index.js
 ┣ 📜requestTransformer.js
 ┗ 📜responseTransformer.js
```

### index.js

The `index.js` file contains characteristics of the service you want to add.

#### Service Components

To make the creation of a service easier, some objects have been defined to describe the available components:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="formComponents" label="Form components">

```js
export const FormComponents = {
  /**
   * builds a checkbox component. A property 'options' must be specified with an array of option objects.
   */
  checkbox: "checkbox",
  /**
   * builds an input text component
   */
  text: "text",
  /**
   * Builds a multiline text area component.
   */
  textArea: "textArea",
  /**
   * builds a select component. A property 'options' must be specified with an array of option objects.
   */
  select: "select",
  /**
   * builds a select component where each option is a column of the table
   */
  selectColumns: "selectColumns",
  /**
   * Builds a multi-select component that allows selecting multiple columns from the current table.
   */
  multipleColumnSelect: "multipleColumnSelect",
  /**
   * Builds a radio button group component. A property 'options' must be specified with an array of option objects.
   */
  radio: "radio",
};
```

</TabItem>
<TabItem value="formFieldRules" label="Form field rules">

```js
export const FormFieldRules = {
  /**
   * the field is required. If a required rule isn't specified, the field is treated as optional
   */
  required: "required",
};
```

</TabItem>
<TabItem value="metaToViewComponents" label="Meta to view components">

```js
export const MetaToViewComponents = {
  /**
   * builds a cell containing a link
   */
  link: "link",
  /**
   * builds a cell which can be used to create a subrow with the metadata content
   */
  sublist: "subList",
  /**
   * builds a cell containing a tag
   */
  tag: "tag",
};
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="structure" label="Reconciliator - File structure">

```js
// be sure to export the object as default
export default {
  // private properties are kept on the server
  private: {
    // specifies the endpoint to the external service in the environment file (.env)
    endpoint: process.env.ENVIRONMENT_VARIABLE,
    // if true the request is processed to return unique values (labels/metadataIds)
    // the req object contains two objects 'original' with
    // the original request and 'processed' with the processed request. Defaults to false
    processRequest: false,
  },
  // public properties are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: "",
    // a description to give the user informations about this service (shown in the UI).
    // It supports HTML markup syntax.
    description: "",
    // relative URL which will be queried from the client. e.g.: /reconciliators/asia/geonames
    relativeUrl: "",
    // (e.g: geo, wd, dbp)
    prefix: "",
    // base URI of the resources returned from this service
    uri: "",
    // specify how to visualize metadata information
    metaToView: {},
    // specify how to render the form to query the extension service
    // each object of the array identifies a form field. Can be empty.
    formParams: [],
  },
};
```

:::info

`Type` corresponds to a UI componenent. Check [here](/frontend/metadata-components.md) how to add new UI component. If `type` is omitted the field is treated as text. The data fields included
in the object will be displayed in the UI, meanwhile all others fields are left out of the visualization.

:::

</TabItem>

<TabItem value="exampleRecon" label="Reconciliator - Example">

```js
import { MetaToViewComponents } from "../../../schemas/constants";

export default {
  private: {
    endpoint: process.env.ASIA_RECONCILIATION,
    // if true the request is processed to return unique values (labels/metadataIds)
    // the req object contains two objects 'original' with
    // the original request and 'processed' with the processed request
    processRequest: false,
  },
  public: {
    name: "ASIA (geonames)",
    prefix: "geo",
    relativeUrl: "/asia/geonames",
    description:
      "Reconcile entities to Geonames using ASIA. This service might prove useful when reconciling geospatial entities (places).",
    uri: "http://www.geonames.org/",
    metaToView: {
      id: {
        label: "ID",
      },
      name: {
        label: "Name",
        type: MetaToViewComponents.link,
      },
      score: {
        label: "Score",
      },
      type: {
        label: "Types",
        type: MetaToViewComponents.sublist,
      },
      match: {
        label: "Match",
        type: MetaToViewComponents.tag,
      },
    },
  },
};
```

:::info

`Type` corresponds to a UI componenent. Check [here](/frontend/metadata-components.md) how to add new UI component. If `type` is omitted the field is treated as text. The data fields included
in the object will be displayed in the UI, meanwhile all others fields are left out of the visualization.

:::

</TabItem>

</Tabs>

<Tabs>

<TabItem value="structureExtender" label="Extender - File structure">

```js
// be sure to export the object as default
export default {
  // private properties are kept on the server
  private: {
    // endpoint to the external service specified in the environment file (.env)
    endpoint: process.env.ENVIRONMENT_VARIABLE,
  },
  // public properties are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: "",
    // a description to give the user informations about this service (shown in the UI).
    // It supports HTML markup syntax.
    description: "",
    // relative URL which will be queried from the client. e.g.: /reconciliators/asia/geonames
    relativeUrl: "",
    // specify how to render the form to query the extension service
    // each object of the array identifies a form field. Can be empty.
    formParams: [],
  },
};
```

</TabItem>

<TabItem value="exampleExt" label="Extender - Example">

```js
import { FormComponents, FormFieldRules } from "../../../schemas/constants";

export default {
  private: {
    endpoint: process.env.ASIA_EXTENSION,
  },
  public: {
    nname: "ASIA (geonames)",
    relativeUrl: "/asia/geonames",
    description:
      "ASIA extension service based on geonames allows to extend a column with data on locations of a certain administrative order. The input column has to be reconciliated against geonames entities.",
    formParams: [
      {
        id: "property",
        description: "Select on or more <b>Property</b> values:",
        label: "Property",
        inputType: FormComponents.checkbox,
        rules: [FormFieldRules.required],
        options: [
          {
            id: "adm1",
            label: "First-order administrative division (Regions or States)",
            value: "parentADM1",
          },
          {
            id: "adm2",
            label: "Second-order administrative division (Provinces)",
            value: "parentADM2",
          },
          {
            id: "adm3",
            label: "Third-order administrative division (Communes)",
            value: "parentADM3",
          },
          {
            id: "adm4",
            label: "Fourth-order administrative division",
            value: "parentADM4",
          },
        ],
      },
    ],
  },
};
```

</TabItem>

</Tabs>

<Tabs>

<TabItem value="structureModifier" label="Modifier - File structure">

```js
// be sure to export the object as default
export default {
  // private properties are kept on the server
  private: {
    // endpoint to the external service (empty for Modifier, no external call needed)
    endpoint: "",
  },
  // public properties are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: "",
    // a description to give the user informations about this service (shown in the UI).
    // It supports HTML markup syntax.
    description: "",
    // relative URL which will be queried from the client (empty for Modifier, no external call needed)
    relativeUrl: "",
    // specify how to render the form to query the modification service
    // each object of the array identifies a form field. Can be empty.
    formParams: [],
  },
};
```

</TabItem>

<TabItem value="exampleMod" label="Modifier - Example">

```js
export default {
  private: {
        endpoint: "",
        processRequest: true,
  },
  public: {
    name: "Data Cleaning",
    description: "A transformation function that allows users to clean and normalize textual data by applying basic" +
      "text operations such as trimming whitespace, changing case (lowercase, uppercase, titlecase).",
    relativeUrl: "",
    skipFiltering: true,
    formParams: [
      {
        id: "operationType",
        label: "Transform operation",
        description: "Select a transformation operation to apply to the selected column.",
        inputType: "radio",
        infoText: "",
        rules: ["required"],
        options: [
          { id: "trim", label: "Remove unnecessary whitespace", value: "trim" },
          { id: "removeSpecial", label: "Remove special characters", value: "removeSpecial" },
          { id: "normalizeAccents", label: "Normalize accents and diacritics", value: "normalizeAccents" },
          { id: "toLowercase", label: "Convert to lowercase", value: "toLowercase" },
          { id: "toUppercase", label: "Convert to uppercase", value: "toUppercase" },
          { id: "toTitlecase", label: "Convert to titlecase", value: "toTitlecase" },
        ],
      },
    ],
  },
};
```

</TabItem>

</Tabs>

### requestTransformer.js

The `requestTransformer.js` file contains a transformation function which transform the client request to the format necessary to query the external service. The function returns the response from the external service. Each **requestTransformer** receives **req** which contains:

- `original`: the original request to the server
- `processed` (_optional_): the processed request to the server if the specified configuration for the service contains `processRequest` set to **true**.

<Tabs>
<TabItem value="structure" label="File structure">

```js
import config from './index';
// library to perform http requests
import axios from 'axios';

const { endpoint } = config.private;

// be sure to export the function as default
export default async (req) => {
  const { items } = req.processed;

  // transformation function applied to the request items to query the service
  const formBody = ...

  const response = await axios.post(`${endpoint}/geonames`, formBody)
  return response.data;
}
```

</TabItem>

<TabItem value="example" label="Example">

```js
import config from "./index";
import axios from "axios";

const { endpoint } = config.private;

export default async (req) => {
  const { items } = req.processed;

  const queries = Object.keys(items).reduce(
    (acc, label) => ({
      ...acc,
      [label]: { query: encodeURIComponent(label || "") },
    }),
    {}
  );

  const formBody = "queries=" + JSON.stringify(queries);
  const response = await axios.post(`${endpoint}/geonames`, formBody);

  return response.data;
};
```

</TabItem>
</Tabs>

**Reconciliation** and **extension** requests have the following formats:

<Tabs>
<TabItem value="recReqOrig" label="Reconciliation request (original)">

```json
{
  "serviceId":"asiaGeonames",
  "items":[
    {"id":"r0$StrCity","label":"Kirchheim unter Teck"},
    {"id":"r1$StrCity","label":"Herrenberg"},
    {"id":"r2$StrCity","label":"Baden-Baden"},
    {"id":"r3$StrCity","label":"Aalen"},
    ...
  ]
}
```

</TabItem>

<TabItem value="recReqProc" label="Reconciliation request (processed)">

```json
{
  "items": {
    "Kirchheim unter Teck": ["r0$StrCity"],
    "Herrenberg": ["r1$StrCity"],
    "Baden-Baden": ["r2$StrCity"],
    // 3 cells have the same label "Aalen"
    "Aalen": ["r3$StrCity", "r4$StrCity", "r5$StrCity"],
    ...
  }
}
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="extReqOrig" label="Extension request (original)">

```json
{
  "serviceId":"asiaGeonames",
  "items":{
    // column
    "Match Location":{
      "r0":"geo:6557942",
      "r1":"geo:6557935",
      "r2":"geo:6555605",
      "r3":"geo:6558032",
      "r4":"geo:6558054"
    },
  },
  // additional properties for the specific extender service
  "property":["parentADM1"],
  ...
}
```

</TabItem>

<TabItem value="extReqProc" label="Extension request (processed)">

```json
{
  "items":{
    // column
    "Match Location":{
      "geo:6557942": ["r0", "r5", "r7"],
      "geo:6557935": ["r1"],
      "geo:6555605": ["r2"],
      "geo:6558032": ["r3"],
      "geo:6558054": ["r4"],
      ...
    },
  },
  "props": {
    // additional properties for the specific extender service
    "property":["parentADM1"],
    ...
  }
}
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="extReqOrig" label="Modification request (original)">

```json
{
  "serviceId":"dataCleaning",
  "items":{
    // column
    "Football Club":{
      "r0": ["Arsenal", [], "Football Club"],
      "r1": ["Aston Villa", [], "Football Club"],
      "r2": ["Bournemouth", [], "Football Club"],
      ...
    },
  },
  // additional properties for the specific modifier service
  "props": {
    "operationType": "toUppercase",
    "selectedColumns": ["Football Club"],
    ...
  }
}
```

</TabItem>

<TabItem value="extReqProc" label="Modification request (processed)">

```json
{
  "items":{
    // column
    "Football Club": {
      "Arsenal,,Football Club": ["r0"],
      "Aston Villa,,Football Club": ["r1"],
      "Bournemouth,,Football Club": ["r2"],
      ...
    },
  },
  "props": {
    // additional properties for the specific modifier service
    "operationType": "toUppercase",
    "selectedColumns": ["Football Club"],
    ...
  }
}
```

</TabItem>
</Tabs>

### responseTransformer.js

The `responseTransformer.js` file contains a transformation function which transform the response of the external service to a standard format so that the frontend application always receives the same data to operate on:

<Tabs>
<TabItem value="structure" label="Reconciliator - File structure">

```js
// be sure to export the function as default
// the function receives as input the request object of the requestTransformer
// (req) and the response from the external service (res)
export default async (req, res) => {
  const { items } = req.processed;

  // transformation function applied to the response (res) of the requestTransformer
  const response = ...
  return response;
}
```

</TabItem>

<TabItem value="recExample" label="Reconciliator - Example">

```js
export default async (req, res) => {
  const { items } = req.processed;

  const response = Object.keys(res).flatMap((label) => {
    const metadata = res[label].result.map(({ id, ...rest }) => ({
      id: `geo:${id}`,
      ...rest,
    }));

    return items[label].map((cellId) => ({
      id: cellId,
      metadata,
    }));
  });

  return response;
};
```

</TabItem>

</Tabs>
<Tabs>

<TabItem value="extStructure" label="Extender - File structure">

```js
// be sure to export the function as default
// the function receives as input the request object from the requestTransformer
// (req) and the response from the external service (res)
export default async (req, res) => {
  const { items } = req.processed;
  // input columns ids from the request items
  const inputColumns = Object.keys(items);

  let response = {
    // columns entities to be added
    columns: {},
    // mapping between the new column obtained from extension of the input column (i.e.: { newColumnId: inputColumnId })
    // meta is used to place the new columns in the correct order in the UI.
    meta: {}
  }

  // transformation function to obtain the response
  ...

  return response;
}

```

</TabItem>

<TabItem value="extExample" label="Extender - Example">

```js
const getMetadata = (metaRaw) => {
  return metaRaw.map(({ id, name }) => ({
    id: `geo:${id}`,
    name,
    score: 100,
    match: true,
  }));
};

export default async (req, res) => {
  const { items } = req.processed;
  const inputColumns = Object.keys(items);

  let response = {
    columns: {},
    meta: {},
  };

  // each input column generated a response from the external service
  res.forEach((serviceResponse, colIndex) => {
    const { meta, rows } = serviceResponse.res;

    meta.forEach((property) => {
      const { id: propId } = property;
      const colId = `${inputColumns[colIndex]}_${propId}`;
      // create columns
      response.columns[colId] = {
        label: colId,
        metadata: [],
        cells: {},
      };
      // add columns mapping
      response.meta = {
        ...response.meta,
        [colId]: inputColumns[colIndex],
      };

      // add cells to each column
      Object.keys(rows).forEach((metadataId) => {
        // get rows for each metaId
        const requestRowsIds =
          items[inputColumns[colIndex]][`geo:${metadataId}`];

        // build cells
        const cells = requestRowsIds.reduce((acc, rowId) => {
          const cellMetadata = getMetadata(rows[metadataId][property.id]);

          acc[rowId] =
            cellMetadata && cellMetadata.length > 0
              ? {
                  label: cellMetadata[0].name,
                  metadata: cellMetadata,
                }
              : null;
          return acc;
        }, {});

        // add cells to column
        response.columns[colId].cells = {
          ...response.columns[colId].cells,
          ...cells,
        };
      });
    });
  });

  return response;
};
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="structure" label="Modifier - File structure">

```js
// be sure to export the function as default
// the function receives as input the request object of the requestTransformer
// (req) and the response from the external service (res)
export default async (req, res) => {
  const { items } = req.processed;

  // transformation function applied to the response (res) of the requestTransformer
  const response = ...
  return response;
}
```

</TabItem>

<TabItem value="modExample" label="Modifier - Example">

```js
export default async (req, res) => {
  const { items, props } = req.original;
  const { operationType, selectedColumns } = props;

  const response = { columns: {}, meta: {} };
  selectedColumns.forEach((col) => {
    response.columns[col] = {
      label: col,
      kind: "", 
      metadata: [],
      cells: {},
    };

    const columnData = items[col];
    Object.entries(columnData).forEach(([rowId, val]) => {
      const raw = String(val?.[0] ?? "");
      let transformed = raw;

      switch (operationType) {
        case "trim": transformed = raw.trim(); break;
        case "removeSpecial": transformed = raw.replace(/[^a-zA-Z0-9\s]/g, ""); break;
        case "normalizeAccents": transformed = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); break;
        case "toLowercase": transformed = raw.toLowerCase(); break;
        case "toUppercase": transformed = raw.toUpperCase(); break;
        case "toTitlecase": transformed = raw .toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());break;
        default: throw new Error(`Unknown operation type: ${operationType}`);
      }

      response.columns[col].cells[rowId] = {
        label: transformed,
        metadata: [],
      };
    });
  });
  return response;
}

```

</TabItem>

</Tabs>

**Reconciliation** and **extension** responses have the following formats:

<Tabs>
<TabItem value="recReq" label="Reconciliation response">

```json
[
  {
    "id": "r1$StrCity",
    // follows the w3c standard for the representation of the annotations
    "metadata":[
      {
        "id": "geo:6555605",
        "name": "Baden-Baden",
        "type": [
          { "id": "A.ADM4", "name": "A.ADM4"}
        ],
        "score": 138.1361083984375,
        "match": false
      },
      ...
    ]
  },
  {
    "id": "r2$StrCity",
    "metadata":[...]
  },
  {
    "id": "r3$StrCity",
    "metadata":[...]
  },
  ...
]
```

</TabItem>

<TabItem value="extReq" label="Extension response">

```json
{
  "columns": {
    "StrCity_parentADM1": {
      "label": "StrCity_parentADM1",
      "metadata": [],
      "cells": {
        "r1": {
          "label": "Lucerne",
          "metadata": [
            {
              "id": "geo:2659810",
              "name": "Lucerne",
              "score": 100,
              "match": true
            }
          ]
        },
        "r2": {
          "label": "Victoria",
          "metadata": [
            {
              "id": "geo:2145234",
              "name": "Victoria",
              "score": 100,
              "match": true
            }
          ]
        },
        ...
      }
    }
  },
  "meta": {
    "StrCity_parentADM1": "StrCity"
  }
}
```

</TabItem>

<TabItem value="modReq" label="Modification response">

```json
{
  "columns": {
    "Football Club": {
      "label": "Football Club",
      "kind": "",
      "metadata": [],
      "cells": [
        "r0": { "label": "ARSENAL", "metadata": [] },
        "r1": { "label": "ASTON VILLA", "metadata": [] },
        "r2": { "label": "BOURNEMOUTH", "metadata": [] },
        ...
      ]
    }
  },
  "meta": {}
}
```

</TabItem>
</Tabs>

:::info

You can prevent a configured service from being loaded into the runtime of the server using the `exclude` field in the initial configuration, as described [here](./config.md#configuration).

:::
