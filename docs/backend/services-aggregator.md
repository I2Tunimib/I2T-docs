---
sidebar_position: 5
---

# External services aggregator

Many services might be available to perform operations required for the Semantic Enrichment of a table. For example, multiple services can provide their own logic to perform a STI approach and generate annotations for a given table. Some other services might
operate only on some of the annotation levels, i.e.: reconciliators that provide instance-level annotations for the table cells, or reconciliators that work
on the schema-level annotation of the table, mapping columns to ontology
concepts, determine the subject, named-entity, or literal column, or finding
relations between pairs of columns.

The service aggregator layer is built in such a way that new external services can be integrated by developers following the framework structure.

In the current version of SemTUI there are two types of services:

- _reconciliators_: perform the reconciliation of labels against a KG, and in general providing annotation for CEA,
  CTA and CPA (with partial annotation, or full table annotation).
- _extenders_: allow the users to extend one or more column with information from other
  datasets enriching the original data table.

## Server startup

As soon as the server spins up, all described services are parsed and validated against a schema. An unsuccessful parsing of a service will result in a validation error.
Invalid services won't be available at runtime.

The user will be prompted with the following information on startup:

```
Reconciliators

✖ service1
Errors:
1. detailed validation error

✔ service2
✔ service3
✔ service4

Extenders

✔ service1
✔ service2
✔ service3

```

## Query an external service

Once a client connects to the
server, a configuration for all the supplied services is sent to the client where
it is parsed, displaying available services and their settings to the user. When
a request to a service is sent from the client to the server, a pipeline executes the transformation functions specified to query the service and return
its result. An additional post processing is applied to the final response to
compute some statistics necessary for the application. The post processing is
placed on top of the transformation functions provided by the user, so that
further services additions do not need to explicitly tell the system how to
compute those statistics.

<div style={{textAlign: 'center'}}>
  <img src="/I2T-docs/img/query-service.png" />
</div>

:::info

Two different pipeline exists for reconciliators and extenders services. They can be found in `./api/services/extension/extension-pipeline.js` and `./api/services/reconciliation/reconciliation-pipeline.js`.

:::

## Add a new service

Services are situated in the `services` folder at the root of the application. They are grouped by their core functionality. At the moment there are services of types `reconciliator` and `extender`. Each service is constitued by three components:

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
   * builds a select component. A property 'options' must be specified with an array of option objects.
   */
  select: "select",
  /**
   * builds a select component where each option is a column of the table
   */
  selectColumns: "selectColumns",
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
</Tabs>

:::info

You can prevent a configured service from being loaded into the runtime of the server using the `exclude` field in the initial configuration, as described [here](./config.md#configuration).

:::
