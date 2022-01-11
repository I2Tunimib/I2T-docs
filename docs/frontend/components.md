---
sidebar_position: 4
---

# Components tree
The majority of the logic of the entire application
resides in the two layers just presented, the global store and the thunks. The
frontend web application has another important layer that aims to present to
the users changes to the internal stored data, enabling complex processes to
be executed through the simple interaction with visual components displayed
to the users.

React builds user interfaces with the composition of multiple components,
they are essentialy the building blocks of any React application. A compo-
nent is a class or a function that takes input properties, if necessary, and
returns a React element that describes how a section of the UI should ap-
pear. Think about a simple button element. A Button component can be
built as a function which takes as input the label of the button and a click
handler, and the result is an HTML button element with attached an event
handler for the click event.

```tsx title="Button component example"
const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}
```

Components can then be reused throughout the whole application without the need to rewrite the same code that would render the same unit. The
power of React comes from the composition of components to seamlessly
build a user interface. Let’s imagine to build a list of the available tables
uploaded on the server. The list would be a container component which renders, for each table, a list item. Each list item may be composed by other
components, e.g.: a label displaying the table name, a component showing
the last time the table has been modified, a status indicator and a button.
Each component has been defined once, but it has been used multiple times
for the creation of the list. The result takes on a tree structure where each
node is a component and the depth defines the hierarchy between all of the
components that build the list.

<div style={{textAlign: 'center'}}>
  <img style={{width: '600px'}} src="/I2T-docs/img/component-tree.png" />
</div>

It’s also important to understand that React only rerenders components
when necessary so that data changes are reflected to the view. A rerender
for a component takes place only when an input property, or the component
internal state changes, so that performance are kept high during the whole
lifecycle of the application.

Those characteristics make the application fully modular thanks to the
tree structure. Any nodes of the tree can be substituted anytime with other
components without impacting on the rest of the application.