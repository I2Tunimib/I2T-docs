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

- *reconciliators*: perform the reconciliation of labels against a KG, and in general providing annotation for CEA,
CTA and CPA (with partial annotation, or full table annotation).
- *extenders*: allow the users to extend one or more column with information from other
datasets enriching the original data table.

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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="structure" label="Reconciliator - File structure">

```js
// be sure to export the object as default
export default {
  // private properties are kept on the server
  private: {
    // specifies the endpoint to the external service in the environment file (.env)
    endpoint: process.env.ENVIRONMENT_VARIABLE
  },
  // public properties are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: '',
    // a description to give the user informations about this service (shown in the UI). 
    // It supports HTML markup syntax. 
    description: '',
    // relative URL which will be queried from the client. e.g.: /reconciliators/asia/geonames
    relativeUrl: '',
    // (e.g: geo, wd, dbp)
    prefix: '',
    // base URI of the resources returned from this service
    uri: '',
    // specify how to visualize metadata information
    metaToView: {}
  }
}
```

:::info

`Type` corresponds to a UI componenent. Check [here](/frontend/metadata-components.md) how to add new UI component. If `type` is omitted the field is treated as text. The data fields included
in the object will be displayed in the UI, meanwhile all others fields are left out of the visualization.

:::

</TabItem>

<TabItem value="exampleRecon" label="Reconciliator - Example">

```js
export default {
  private: {
    endpoint: process.env.ASIA_RECONCILIATION
  },
  public: {
    name: 'ASIA (geonames)',
    prefix: 'geo',
    relativeUrl: '/asia/geonames',
    description: 'Reconcile entities to Geonames using ASIA.',
    uri: 'http://www.geonames.org/',
    metaToView: {
      id: {
        label: 'ID',
      },
      name: {
        label: 'Name',
        type: 'link'
      },
      score: {
        label: 'Score'
      },
      type: {
        label: 'Types',
        type: 'subList'
      },
      match: {
        label: 'Match',
        type: 'tag'
      }
    }
  }
}
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
    endpoint: process.env.ENVIRONMENT_VARIABLE
  },
  // public properties are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: '',
    // a description to give the user informations about this service (shown in the UI). 
    // It supports HTML markup syntax. 
    description: '',
    // relative URL which will be queried from the client. e.g.: /reconciliators/asia/geonames
    relativeUrl: '',
    // specify how to render the form to query the extension service
    // each object of the array identifies a form field. Can be empty.
    formParams: []
  }
}
```

</TabItem>

<TabItem value="exampleExt" label="Extender - Example">

```js
export default {
  private: {
    endpoint: process.env.ASIA_EXTENSION
  },
  public: {
    name: 'ASIA (geonames)',
    relativeUrl: '/asia/geonames',
    description: 'ASIA extension service based on geonames.',
    formParams: [
      {
        // unique id to identify the form field
        id: 'property',
        // description of the form field
        description: 'Select on or more <b>Property</b> values:',
        // label of the form field
        label: 'Property',
        // input type. Available components are 'text', 'checkbox', 'selectColumns'
        inputType: 'checkbox',
        // rules applied to this form field (only 'required' is currently available)
        rules: ['required'],
        options: [
          {
            id: 'adm1',
            label: 'First-order administrative division (Regions or States)',
            value: 'parentADM1'
          },
          {
            id: 'adm2',
            label: 'Second-order administrative division (Provinces)',
            value: 'parentADM2'
          },
          {
            id: 'adm3',
            label: 'Third-order administrative division (Communes)',
            value: 'parentADM3'
          },
          {
            id: 'adm4',
            label: 'Fourth-order administrative division',
            value: 'parentADM4'
          }
        ]
      }
    ]
  }
}
```

</TabItem>

</Tabs>

### requestTransformer.js
The `requestTransformer.js` file contains a transformation function which transform the client request to the format necessary to query the external service. The function returns the response from the external service:

<Tabs>
<TabItem value="structure" label="File structure">

```js
import config from './index';
// library to perform http requests
import axios from 'axios';

const { endpoint } = config.private;

// be sure to export the function as default
// the function receivs as input the request object from the client
export default async (req) => {
  const { items } = req;

  // transformation function applied to the request items to query the service
  const formBody = ...

  const response = await axios.post(`${endpoint}/endpoint/service`, formBody)
  return response.data;
}
```

</TabItem>

<TabItem value="example" label="Example">

```js
import config from './index';
import axios from 'axios';

const { endpoint } = config.private;

export default async (req) => {
  const { items } = req;
  const queries = items.reduce((acc, { id, label }) => ({
    ...acc,
    [id]: { query: encodeURIComponent(label || '') }
  }), {})

  const formBody = 'queries=' + JSON.stringify(queries);
  const response = await axios.post(`${endpoint}/geonames`, formBody)
  return response.data;
}
```

</TabItem>
</Tabs>

**Reconciliation** and **extension** requests have the following formats:

<Tabs>
<TabItem value="recReq" label="Reconciliation request">

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

<TabItem value="extReq" label="Extension request">

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
</Tabs>

### responseTransformer.js
The `responseTransformer.js` file contains a transformation function which transform the response of the external service to a standard format so that the frontend application always receives the same data to operate on:

<Tabs>
<TabItem value="structure" label="Reconciliator - File structure">

```js
import config from './index';
// resource uri from the index configuration
const { uri } = config.public;

// be sure to export the function as default
// the function receives as input the request object from the client 
// (res) and the response from the external service (res)
export default async (req, res) => {
  // transformation function applied to the response (res) of the requestTransformer
  const response = ...
  return response;
}
```

</TabItem>

<TabItem value="recExample" label="Reconciliator - Example">

```js
import config from './index';

const { uri } = config.public;

export default async (req, res) => {
  const response = Object.keys(res).map((id) => {
    const metadata = res[id].result.map((metaItem) => ({
      ...metaItem,
      name: {
        value: metaItem.name,
        uri: `${uri}${metaItem.id}`
      }
    }))

    return {
      id,
      metadata
    }
  });
  return response;
}
```

</TabItem>

</Tabs>
<Tabs>

<TabItem value="extStructure" label="Extender - File structure">

```js
// be sure to export the function as default
// the function receives as input the request object from the client 
// (res) and the response from the external service (res)
export default async (req, res) => {
  const { items } = req;
  // input columns ids from the request items
  const inputColumnsLabels = Object.keys(items);

  let response = {
    // columns entities to be added
    columns: {},
    // rows of the columns to be added 
    // (e.g.: if only a column is added, each row would contain only once cell)
    rows: {},
    // a mapping between the new column obtained from extension of the input column (i.e.: { newColumnId: inputColumnId })
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
// contains mappings between prefixes and URIs (e.g.: dbp: { uri: 'http://www.geonames.org/' })
import { KG_INFO } from "../../../utils/constants";

export default async (req, res) => {
  const { items } = req;
  const inputColumnsLabels = Object.keys(items);

  let response = {
    columns: {},
    rows: {},
    meta: {}
  }

  res.forEach((serviceResponse, colIndex) => {
    serviceResponse.forEach(({ rowId, data }) => {
      data.forEach(({ weatherParameters, offset }) => {
        if (weatherParameters) {
          weatherParameters.forEach(({ id, ...rest }) => {
            const colId = `${inputColumnsLabels[colIndex]}_offset${offset}_${id}`;
            response.columns[colId] = {
              id: colId,
              label: colId,
              metadata: []
            }
            response.meta[colId] = inputColumnsLabels[colIndex];

            const cellId = `${rowId}$${colId}`;
            response.rows[rowId] = {
              ...response.rows[rowId],
              id: rowId,
              cells: {
                ...(response.rows[rowId] && { ...response.rows[rowId].cells }),
                [colId]: {
                  id: cellId,
                  label: id === 'sund' ? rest.cumulValue : rest.avgValue,
                  metadata: []
                }
              }
            }
          });
        }
      });
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
    "metadata":[
      {
        "id": "6555605",
        "name": {
          "value": "Baden-Baden",
          "uri": "http://www.geonames.org/6555605"
        },
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
    "StrCity_parentADM1_offset0_ws": {
      "id": "StrCity_parentADM1_offset0_ws",
      "label": "StrCity_parentADM1_offset0_ws",
      "metadata": []
    }
  },
  "rows": {
    "r0": {
      "id": "r0",
      "cells": {
        "StrCity_parentADM1_offset0_ws": {
          "id": "r0$StrCity_parentADM1_offset0_ws",
          "label": 8.234119802185715,
          "metadata": []
        }
      }
    },
    "r2": {
      "id": "r2",
      "cells": {
        "StrCity_parentADM1_offset0_ws": {
          "id": "r2$StrCity_parentADM1_offset0_ws",
          "label": 7.960282242257143,
          "metadata": []
        }
      }
    },
    ...
  }
  "meta": {
    "StrCity_parentADM1_offset0_ws": "StrCity_parentADM1"
  }
}
```

</TabItem>
</Tabs>

:::info

You can prevent a configured service from being loaded into the runtime of the server using the `exclude` field in the initial configuration, as described [here](./config.md#configuration).

:::

