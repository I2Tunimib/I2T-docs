---
sidebar_position: 2
---

# Store

In the store resides data necessary to update the view
of the application. **Redux** is used for this purpose which helps in building
applications that behave consistently by centralizing the application state
and logic, enabling powerful capabilities like undo/redo and state persistence.

While Redux increases the complexity and verbosity of the application,
by introducing three software layers for the interaction and data flow between
React components and the application store, it also allows components, composed in any hierarchy, to access the global store without any dependency.
Indeed, pure React has troubles in propagating data between siblings components, and in general the data for the leaf components needs to be forwarded
down through many layers of the components tree. Redux solves this problem, by granting each component direct access to a global store and retrieve
the needed data for each of them.

SemTUI utilizes the application store for many purposes: handling data
changes in an efficient way, storing API responses, caching data, and handling
global actions between components. The most important use of it is to
maintain the tabular data in memory in such a way that changes to it are
made efficiently. In particular, the table data is treated as a database-like
structure where the entities are the columns, rows and cells, and relations
exist between each other. Redux calls this representation as normalized state.
A normalized state enables one to look up entities directly by their IDs
optimizing most of the operations, for example preventing users to constantly
iterate over arrays to find a specific entity.

The combination of both a normalized and globally available state makes
it possible to initiate actions from various components, e.g.: deleting a col-
umn from a contextual menu inside a component representing the same col-
umn, but also from a component completely external to the table, without
giving up on performances and without passing unneeded properties to nested
React components.

The interaction between a component and a store is mediated by:

- **Action dispatcher**: a component dispatch an action which describes the
content of a request to modify a certain part of the store;
- **Reducer function**: a function which determines changes to an application’s state. A reducer receives the payload of the action and applies a
transformation to the store returning a new state. A reducer isn’t allowed to execute any side effects, e.g.: make an asynchornous call to an
API, instead it is a pure function, meaning it always returns the same
result given the same input and it doesn’t depends on any external
event other than the action.
- **Selector**: finally, a selector is invoked in a component to access and
return part of the store, by also applying, if necessary, a transformation
function before rerendering its view. Each time a dependency of a
selector changes, the return value of the selector is recomputed and the
component gets rerendered to reflect the changes. Some libraries also
introduce memoization for the selectors, caching results by comparing
their dependencies and return values. Before recomputing a result, the
cache is first checked returning the cached value if present.

<div style={{textAlign: 'center'}}>
  <img style={{width: '600px'}} src="/I2T-docs/img/dataflow-redux.png" />
</div>

## Slice structure
SemTUI organizes its store in slices as suggested from the [Redux Toolkit documentation](https://redux-toolkit.js.org/tutorials/quick-start).
Each slice defines a part of the store state, also defining how the state should change based on an action.
Each store slice of the application has a structure based on the previously depicted dataflow:

```jsx
📦table
 ┣ 📂interfaces          // types definitions for the slice
 ┣ 📂utils               // utility functions resusable for the slice
 ┣ 📜table.selectors.ts  // selector for the slice
 ┣ 📜table.slice.ts      // state and reducers for the slice
 ┗ 📜table.thunk.ts      // async actions for the slice (will be presented in the next section)
```

### \[sliceName\].slice.ts

```ts title="Example of slice"
// The slice defines an initial state
const initialState: TableState = {
  entities: {
    tableInstance: {},
    columns: { byId: {}, allIds: [] },
    rows: { byId: {}, allIds: [] }
  },
  ...
};
// Create a slice
export const tableSlice = createSliceWithRequests({
  name: 'table',
  initialState,
  // reducers are functions that change the state for an action
  reducers: {
    setRows: (state, action: PayloadAction<Rows>) => {
      const rows = action.payload
      // redux toolkit internally handles variables mutation, so that variables can be mutated without
      // worrying about creating a new variable by copying old and new values
      state.entities.rows = rows;
    },
    ...
  }
});

// Export actions automatically created from the slice reducercs (thanks to Redux Toolkit)
export const {
  setRows,
  ...
} = tableSlice.actions;
// Export slice reducers
export default tableSlice.reducer;
```

Actions can then be dispatched from any components to update the state.
```tsx
const SomeComponent = () => {
  // useAppDispatch instead of useDispatch, so that types are correctly inferred
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setRows(someRows));
  },
  
  return (
    ...
  )
}
```

### \[sliceName\].selectors.ts
Selectors are written using the `Reselect` library, so that memoization is applied to selector functions. Memoization allows components to rerender without re-executing a selector function if the input of a selector didn't change. More deatils are available in the [GitHub documentaion](https://github.com/reduxjs/reselect).

```ts title="Example selector"
// create an input selector. An input selector takes as input the entire state composed by slices and returns part of the state
const selectRowsInput = (state: RootState) => state.table.entities;

// create output selector. An output selector takes as input one, or more input 
// selectors and outputs a transformation of the states returned from the input selectors.
// N.B.: output selectors can also be input selectors.
export const selectRows = createSelector(
  selectRowsInput,
  (entities) => entities.rows
);
```

A component can then use an output selector to select part of the state. Selector are revaluated each time an input state changes:
```tsx
const SomeComponent = () => {
  // useAppSelector instead of useSelector, so that types are correctly inferred
  const rows = useAppSelector(selectRows)
  
  return (
    <>
      {rows.map((row) => <div>row.id</div>)}
    </>
  )
}
```

### \[sliceName\].thunks.ts
While a more detailed explanation of thunks is presented in the next section, here's an overview of a slice thunk file. A Thunk is essentialy a middleware which can execute async logic when an action is dispatched, before reaching a reducer function. A `*.thunk.ts` file contains a set of thunks just like the following one:

```ts title="Example of thunk"
export const getTable = createAsyncThunk(
  `${ACTION_PREFIX}/getTable`,
  async (params: Record<string, string | number>) => {
    // query an api endpoint
    const response = await tableAPI.getTable(params);
    return response.data;
  }
);
```

A component can then dispatch a thunk action as any other action:

```tsx
const SomeComponent = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(getTable());
  },
  
  return (
    ...
  )
}
```