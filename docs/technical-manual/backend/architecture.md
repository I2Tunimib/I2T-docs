---
sidebar_position: 1
---

# Architecture
Many examples of performant and scalable backend servers and
web APIs are built using NodeJS or one of its frameworks, e.g.: [Express](https://expressjs.com/it/),
[NestJS](https://nestjs.com/), [NextJs](https://nextjs.org/). The environment around NodeJS is built to support developers by integrating third party libraries that powers those systems with
even more features. NodeJS is a great option for performance, security, scalability and development using some of the most modern technology stacks.
For those reasons the choices of NodeJS and Express were made to develop
the SemTUI backend functionalities. 

The backend server has two main roles to fulfill: **External services aggregator** and **Datasets and tables handler**.

## Technology stack
- **NodeJS**: the core technology to build the backend infrastructure. More details are available [here](https://nodejs.org/it/).
- **ExpressJS**: it's a NodeJS framework primarly used to build APIs. More details are available [here](https://expressjs.com/).

## Structure

In the following snippet is shown the structure of the backend server:

```jsx title="Backend folders and files structure"
📦src
 ┣ 📂api
 ┃ ┣ 📂controllers
 ┃ ┣ 📂routes
 ┃ ┣ 📂middleware
 ┃ ┗ 📂services
 ┣ 📂config
 ┣ 📂services
 ┃ ┣ 📂extenders
 ┃ ┣ 📂modifiers
 ┃ ┗ 📂reconciliators
 ┣ 📂utils
 ┣ 📜app.js
 ┣ 📜index.js
 ┗ 📜socketio.js
```

- `api`: contains the components that builds the REST API: controllers, routes, services. More details are presented in the next section.
- `config`: contains files necessary to parse the initial configuration, or are relative to the configuration of the whole application.
- `services`: contains external services configurations. At the moment external services can be reconciliators, extenders and modifiers.
- `utils`: contains utility modules and functions.
- `app.js`: is the main of the Express server.
- `socket.js`: is the main of the SocketIO app.
- `index.js`: is the main of the whole application.

