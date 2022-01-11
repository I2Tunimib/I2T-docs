---
sidebar_position: 1
---

# Architecture

The second major component of the framework constits of a web application
built as an interface to provide an easy way to interact with the annotation
and enrichment functionalities. Nowadays, websistes aren’t anymore simple
static pages that visulize static information, indeed, they are powerful application embedded into any web browser and accessible from any device.
Today, they are so much comparable to native applications in both terms
of performance and presentation, that hybrid development frameworks were
born to support the development of native and web application with a single
codebase (e.g.: [Flutter](https://flutter.dev/), [React Native](https://reactnative.dev/), [Ionic](https://ionicframework.com/), [Native Script](https://nativescript.org/)).

Most of the popularity of the web has to be given to Javascript and its
environment. Many frameworks are built on top of it to abstract some of the
most basic and repetitive actions, e.g.: appending a child node to the DOM,
leaving developers with powerful tools to develop new ideas. Some of the
most poular frameworks and libraries to create web application are **React**
by Facebook, **Angular** from Google and **Vue**. While Angular is built as
a full-fledged framework, which encourage strict patterns to its developers,
React and Vue are libraries that leave more open choices to the developers.

The frontend web application is essentialy built in three layers: **application store**, **thunk middleware**, **components tree**.

## Technology stack
- **React**: seemed like the best choice, also given that SemTUI is still
a prototype and a reasearch tool which can provide innovative functionalities
supported by the freedom of the library. It’s popularity, also contributed to
the choice. React is a Javascript library to create interactive interfaces
powered by declarative code and updates efficiency of its components.
- **Typescript**: a strongly typed programming language that builds on Javascript has become almost essential in any Javascript environment. Typescript gives developers better experience
and tooling allowing developers to build more solid and robust applications.
- **Redux Toolkit**: the official, opinionated, batteries-included toolset for efficient Redux development. While Redux has been chosen as the application store
paradigm, [Redux Toolkit](https://redux-toolkit.js.org/) includes a toolsets and best practices for organizing the Redux store.
- **MUI**: it's a React UI library built on top of the Google Material guidelines, offering a set of common components reusable throughout the web application. The components documentation can be found [here](https://mui.com/).
- **React Table**: it's a library designed that provides powerful and lightweight API to build tables. It enables developers to be fully creative with their styles by not providing any UI element. More details are available [here](https://react-table.tanstack.com/).
- **EmotionJS**: it's a library for styling the React application with the CSS in JS approach. The documentation can be found [here](https://emotion.sh/docs/introduction).  

## Structure
In the following snippet is shown the structure of the backend server:

```jsx title="Frontend folders and files structure"
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂core
 ┃ ┣ 📂hoc
 ┃ ┣ 📂kit
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂services
 ┃ ┣ 📂api
 ┃ ┗ 📂utils
 ┣ 📂store
 ┃ ┣ 📂enhancers
 ┃ ┣ 📂interfaces
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂slices
 ┣ 📂styles
 ┣ 📜App.tsx
 ┣ 📜config.ts
 ┣ 📜configHelpers.ts
 ┣ 📜routes.ts
```

- `assets`: contains the application assetets that can be imported into any component.
- `components`: contains the components used in the application pages. They are grouped into three categories: core (basic components), kit (more advanced components), hoc (higher order componenets, additional information about HOCs can be found [here](https://reactjs.org/docs/higher-order-components.html)).
- `hooks`: reusable components hooks. More information about React Hooks can be found [here](https://it.reactjs.org/docs/hooks-intro.html).
- `pages`: containes the application pages components.
- `services`: contains api endpoints definitions, or external modules or logic.
- `store`: contains all files related to redux. `Enhancers` are higher order function that empower an already existing function of the store. For example `createSliceWithUndo` enables the undo/redo functionality for a store slice. `Interfaces` contains the type of the store. `Middlewares` contains middlewares that can be attached to redux slices. `Slices` contains the actual store slices of the application.
- `styles`: contains the global styles for the application.
- `App.tsx`: main component.
- `config.tsx`: configuration to setup endpoints.
- `configHelpers`: helpers to parse the configuration and define application endpoints.
- `routes.ts`: contains the route definitions for the pages of the application.
