---
sidebar_position: 2
---

# Application configuration

## Main
The main of the entire application is the `index.js` file situated in the root of the `src` directory.
The main imports three files in the following order:

```js
// import config to load configuration which will be used everywhere else
// MUST BE BEFORE ANYTHING ELSE
import './config/index'
// setup express server API
import './app';
// setup socketIO connection and channels
import './socketio';
```


## Configuration
The application exposes a configuration to setup paths and services. In the root of the application a file `config.js` can be found:

```js title="./config.js"
export default {
  // path to dataset files relative to root folder
  datasetFilesPath: '/public/datasets',
  // path to dataset db relative to root folder
  datasetDbPath: '/public/datasets.info.json',
  // path to tables db relative to root folder
  tablesDbPath: '/public/tables.info.json',
  // path to folder with temporary files
  tmpPath: '/tmp',

  services: {
    // path to services relative to src folder
    path: '/services',
    // specify services to exclude during config initialization
    // excluded services won't be loaded during app startup
    exclude: {
      extenders: [],
      reconciliators: ['lamapi']
    }
  }
}
```

When the application starts up, the configuration will be parsed and various options are made available through an in memory object:

```js title="./config/index.js"
...
const config = await loadConfig();
export default config;
```

So that the configuration can be imported into any other component:

```js title="./api/services/datasets.service.js"
...
import config from '../../../config/index';

const { 
  // get the path to the file containing the collection of the datasets
  getDatasetDbPath,
  // get the path to the file containing the collection of the tables
  getTablesDbPath,
  // get the path to the files of datasets
  getDatasetFilesPath,
  // get path to temp folder
  getTmpPath,
  // check ./config/index.js for all of the options available
} = config.helpers;

...
```

:::info

Check `./config/index.js` for all of the options available in the exported `config` object.

:::