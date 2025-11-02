---
sidebar_position: 2
---

# Backend Integration
### 1. Create the new service module
The first step is to define the backend logic for the new Service Category.
Each category has a dedicated folder that contains:
- a pipeline file, which handles the main execution flow, 
- a utility file, with helper functions used within the pipeline.

```js title="src/api/services/newServiceOperation/newServiceOperation-pipeline.js"
import config from '../../../config/index.js';
import { utilityFunction } from './utils.js';

const { newCategories } = config;

const newServiceOperationPipeline = async (reqBody) => {
  const { serviceId, ...rest } = reqBody;

  // Retrieve the specific service configuration
  const service = newCategories[serviceId];

  if (!service) {
    throw new Error('Service not found');
  }

  const {
    info,
    requestTransformer,
    responseTransformer
  } = service;

  // Check that the required transformation functions exist
  if (!requestTransformer) {
    throw new Error('No request transformer function found');
  }
  if (!responseTransformer) {
    throw new Error('No response transformer function found');
  }

  const { items, ...props } = rest;

  // Prepare the request structure
  const req = {
    original: { items, props },
    ...(info.private.processRequest && {
      processed: { items: utilityFunction(items), props }
    })
  };

  // Execute the external service request
  const serviceResponse = await requestTransformer(req);

  // Transform and format the response for the application
  const transformedResponse = await responseTransformer(req, serviceResponse);

  return transformedResponse;
};

export default newServiceOperationPipeline;
```

```js title="src/api/services/newServiceOperationPipeline/utils.js"
export const utilityFunction = (data) => {
// Example: process or clean up input data before sending it to the service
return data;
};
```

### 2. Create the Controller
The controller acts as the backend entry point for the new service category.
It handles incoming HTTP requests and invokes the corresponding service pipeline.

```js title="src/api/controllers/newServiceOperation.controller.js"
import newServiceOperationPipeline from "../services/newServiceOperation/newServiceOperation-pipeline.js";
import config from '../../config/index.js';

const { newCategories } = config;

const NewServiceOperationController = {
  list: async (req, res, next) => {
    res.json(Object.keys(newCategories).map((key) => ({ id: key, ...newCategories[key].info.public })))
  },
  newCategoryService: async (req, res, next) => {
    try {
      res.json(await newServiceOperationPipeline(req.body))
    } catch (err) {
      next(err);
    }
  }
}

export default NewServiceOperationController;
```

If the new category should also appear in the global configuration endpoint, update the config
controller to include it adding this few lines of code.
```js title="src/api/controllers/config.controller.js"
const { extenders: extConfig, ..., newCategories: newCatConfig } = config;
...
const ConfigController = {
  getConfig: async (req, res, next) => {
    ...
    const newCategories = getPublicConfiguration(newCatConfig);
    try {
      res.json({
        ...
        newCategories,
      });
    } catch (err) {
      next(err);
    }
  }
};
```
### 3. Register the Routes
After creating the controller, the next step is to expose the new Service Category via REST API
endpoints. This requires defining a dedicated route file and registering it in the main router.

```js title="src/api/routes/newCategoryService.route.js"
import { Router } from 'express';
import NewServiceOperationController from '../controllers/newServiceOperation.controller.js';
import asyncMiddleware from '../middleware/async.middleware.js';

const router = Router();

// List all available services
router.get('/list', asyncMiddleware(NewServiceOperationController.list));
// Execute a service
router.post('/*', asyncMiddleware(NewServiceOperationController.execute));

export default router;
```
```js title="src/api/routes/index.js"
...
import newServiceOperationRoutes from "./newServiceOperation.route.js";
...
// Existing routes
router.use("/config", configRoutes);
...
// Register new service category
router.use("/newCategories", newServiceOperationRoutes);
...
```
### 4. Update Configuration
To integrate a new Service Category into the backend, it is necessary to register it in the
application configuration so that the system can load and manage its services dynamically.

```js title="src/config/index.js"
const { services } = CONFIG;
...
const loadNewCategories = async () => {
  const basePath = `${process.env.PWD}/src${services.path}/newCategories`;

  const newCategories = readdirSync(basePath).filter(
    (newCategory) => !services.exclude?.newCategories?.includes(newCategory)
  );

  return newCategories.reduce(async (acc, serviceKey) => {
    const servicePath = `${basePath}/${serviceKey}`;

    const { default: info } = await import(`file:///${servicePath}/index.js`);
    const { default: requestTransformer } = await import(
            `file:///${servicePath}/requestTransformer.js`
            );
    const { default: responseTransformer } = await import(
            `file:///${servicePath}/responseTransformer.js`
            );

    (await acc)[serviceKey] = {
      info,
      requestTransformer,
      responseTransformer,
    };
    return acc;
  }, {});
};
...
/**
 * Load initial configuration
 */
const loadConfig = async () => {
  ...
  const newCategories = await loadNewCategories();
  ...
  return {
    // existing fields
    newCategories,
    ...
  };

```
### 5. Logger Integration
The logger middleware and service track all operations performed on datasets and tables.
For a new service category, it's necessary to extend both the middleware and LoggerService to support
logging of the new category.

```js title="src/api/middleware/logger.js"
const OPERATION_TYPES = {
  ...
  NEW_SERVICE_OPERATION: "NEW_SERVICE_OPERATION",
};

const ROUTE_PATTERNS = {
  ...
  NEW_CATEGORIES: "/api/newCategories",
};
...
async function routeLogs(req) {
  ...
  // Handle different route types
  if (url.includes(ROUTE_PATTERNS.RECONCILERS)) {
    await handleReconciliationRoute(req, url);
  } ... {
  } else if (url.includes(ROUTE_PATTERNS.NEW_CATEGORIES)) {
    await handleNewServiceOperationRoute(req, url);
  }
}
...
async function handleNewServiceOperationRoute(req, url) {
  let requestedNewCategory = extractServiceFromUrl(url, ROUTE_PATTERNS.NEW_CATEGORIES);
  if (req.body && req.body.serviceId) {
      requestedNewCategory += `-${req.body.serviceId}`;
  }
  const taskInfos = await getTaskInfos(req);
  if (taskInfos && taskInfos.length === 3) {
    const [tableId, datasetId, columnName] = taskInfos;
    LoggerService.logNewServiceOperation({
      datasetId,
      tableId,
      columnName,
      service: requestedNewCategory,
      additionalData: req._rawBody || req.body,
    });
  }
}
```
```js title="src/api/services/logger/logger.service.js "
class LoggerService {
  static OPERATION_TYPES = {
    ...
    NEW_SERVICE_OPERATION: "NEW_SERVICE_OPERATION",
};
...
static logNewServiceOperation({
  datasetId,
  tableId,
  columnName,
  service,
  additionalData = {},
}) {
  return LoggerService.#writeLog({
    datasetId,
    tableId,
    operationType: LoggerService.OPERATION_TYPES.NEW_SERVICE_OPERATION,
    options: { columnName, service },
    additionalData,
  });
}
...
const labels = {
  ...
  [LoggerService.OPERATION_TYPES.NEW_SERVICE_OPERATION]: "NewCategory",
};
const serviceLabel = labels[operationType] || "Unknown";
...
```

Once all backend integration steps are completed, create a dedicated folder for the new
Service Category inside `src/services`. Each individual service for this category
should then be implemented within this folder, including its own `index.js`, 
`requestTransformer.js`, and `responseTransformer.js` files as needed.
