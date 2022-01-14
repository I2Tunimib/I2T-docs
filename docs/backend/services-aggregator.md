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
The `index.js` file contains characteristics of the service you want to add:

```js
// be sure to export the object as default
export default {
  // private properties are kept on the server
  private: {
    // specifies the endpoint to the external service in the environment file (.env)
    endpoint: process.env.ASIA_RECONCILIATION
  },
  // public propertiest are sent to the client
  public: {
    // name of the service (shown in the UI)
    name: 'ASIA (geonames)',
    // relative URL which will be queried from the client. e.g.: /reconciliators/asia/geonames
    relativeUrl: '/asia/geonames',
    // a description to give the user informations about this service
    description: 'Reconcile entities to Geonames using ASIA.',
    // base URI of the resources returned from this service
    uri: 'http://www.geonames.org/',
    // how to visualize metadata information 
    // (similarly to how information for a dataset/table are mapped to client side)
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

### requestTransformer.js
The `requestTransformer.js` file contains a transformation function which transform the client request to the format necessary to query the external service. The function returns the response from the external service:

```js
import config from './index';
import axios from 'axios';

const { endpoint } = config.private;

// be sure to export the function as default
// the function receivs as input the request object from the client
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

A **reconciliation** request has the following format:

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

An **extension** request has the following format:

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

### responseTransformer.js
The `responseTransformer.js` file contains a transformation function which transform the response of the external service to a standard format so that the frontend application always receives the same data to operate on:

```js
import config from './index';

const { uri } = config.public;

// be sure to export the function as default
// the function receives as input the request object from the client 
// (res) and the response from the external service (res)
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

A **reconciliation** response has the following format:

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

:::info

You can prevent a configured service from being loaded into the runtime of the server using the `exclude` field in the initial configuration, as described [here](./config.md#configuration).

:::

