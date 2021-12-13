---
sidebar_position: 1
---

# Rest API
The backend exposes a REST api to utilize external services and get, modify, delete datasets and tables.
The rest API is organized in three layers: services, controllers, routes.

## Services
A service is where most of the logic resides (*e.g.: filesystem service, parse service, export service..*.) and is placed in `/src/api/services`.
For example the **FileSystem Service** handles the reading and writing of files on the file system. At the moment of writing the database of tables and dataset resides on the file system, but in the future this service can be easily replaced by a service which handles the communication with a real DB.

## Controllers
A controller is the interface with a http request and uses one or more services to process the incoming request and give back a response.

## Routes
A route corresponses to a mapping between an API endpoint and a controller function.


Here is presented a list of all endpoint which are available at the moment of writing:

| Endpoint      | Method | Return |
| ----------- | ----------- | ---
| /config      | GET       | Configuration of dynamic services necessary for the setup of the UI     |
| /extenders/list      | GET       | Get a list of all available extension services     |
| /extenders/asia/geonames      | POST       | Extend data with asia geonames     |
| /extenders/asia/weather      | POST       | Extend data with asia weather     |
| /reconciliators/list      | GET       | Get a list of all available reconciliators services     |
| /reconciliators/asia/geonames      | POST       | Reconciliate data with asia geonames     |
| /reconciliators/asia/keywordsmatcher      | POST       | Reconciliate data with asia keywords matcher     |
| /reconciliators/asia/wikifier      | POST       | Reconciliate data with asia wikifier    |
| /reconciliators/wikidata      | POST       | Reconciliate data with wikidata open refine    |
| /full-annotation/mantis/dataset/:idDataset/table/:idTable      | POST       | Annotation of a full table with Mantis service    |
| /dataset   | GET        | List of all datasets       |
| /dataset/:idDataset   | GET        | Return a dataset by its ID      |
| /dataset/:idDataset/table   | GET        | Return all tables of a dataset     |
| /dataset/:idDataset/table/:idTable   | GET        | Return a table by its dataset ID and table ID   |
| /dataset/:idDataset/table/:idTable/export   | GET        | Export a table by a given format   |
| /dataset   | POST        | Create a new dataset   |
| /:idDataset/table/:idTable   | PUT        | Update a table   |
| /:idDataset   | DELETE        | Delete a dataset   |
| /:idDataset/table/:idTable  | DELETE        | Delete a table of a dataset   |