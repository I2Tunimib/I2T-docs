---
sidebar_position: 3
---

# Rest API
The backend functionalities are exposed to the client through a REST
API, which provides endpoints for handling tables changes and query external
services. The API structure is built following a three layers architecture:

<div style={{textAlign: 'center'}}>
  <img src="/I2T-docs/img/layers-backend.png" />
</div>

- *Route*: a route defines an API endpoint and it’s the highest layer in
the architecture. The client side application interacts with routes to
communicate with the backend.
- *Controller*: a controller groups requests handlers of a common API resource. For example, a dataset controller provides handlers for requests
that create, update, delete, search a dataset.
- *Service*: a service contains the business logic of part of the application
and it’s the lowest layer of the API architecture. Services are used
throughout the whole application using composition. For example, a
controller may use multiple services to handle the request from a client
and return a response, e.g.: when the client sends a request to create
a new table, a service might provide the function to parse the table to
the internal format and then, another service is used to store the table
on the file system.


Here is presented a list of all endpoints which are available at the moment of writing:

| Endpoint                                                              | Method | Return                                                                                                 |
|----------------------------------------------------------------------|--------|--------------------------------------------------------------------------------------------------------|
| /config                                                              | GET    | Configuration of dynamic services necessary for the setup of the UI                                   |
| /extenders/list                                                      | GET    | Get a list of all available extension services                                                         |
| /extenders/asia/geonames                                             | POST   | Extend data with asia geonames                                                                         |
| /extenders/asia/weather                                              | POST   | Extend data with asia weather                                                                          |
| /reconciliators/list                                                 | GET    | Get a list of all available reconciliators services                                                    |
| /reconciliators/asia/geonames                                       | POST   | Reconciliate data with asia geonames                                                                   |
| /reconciliators/asia/keywordsmatcher                                | POST   | Reconciliate data with asia keywords matcher                                                           |
| /reconciliators/asia/wikifier                                       | POST   | Reconciliate data with asia wikifier                                                                   |
| /reconciliators/wikidata                                            | POST   | Reconciliate data with wikidata open refine                                                            |
| /full-annotation/mantis/dataset/:idDataset/table/:idTable           | POST   | Annotation of a full table with Mantis service                                                         |
| /dataset                                                            | GET    | List of all datasets                                                                                   |
| /dataset/:idDataset                                                 | GET    | Return a dataset by its ID                                                                             |
| /dataset/:idDataset/table                                           | GET    | Return all tables of a dataset                                                                         |
| /dataset/:idDataset/table/:idTable                                  | GET    | Return a table by its dataset ID and table ID                                                          |
| /dataset/:idDataset/table/:idTable/export                           | GET    | Return the :idTable in a given format. Static formats: json (default), csv, and rdf (TBD). Dynamic formats: py and ipynb. |
| /dataset                                                            | POST   | Create a new dataset                                                                                   |
| /:idDataset/table/:idTable                                          | PUT    | Update a table                                                                                         |
| /:idDataset                                                         | DELETE | Delete a dataset                                                                                       |
| /:idDataset/table/:idTable                                          | DELETE | Delete a table of a dataset                                                                            |
