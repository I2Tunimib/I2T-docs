---
sidebar_position: 7
---

# Table Viewer
The table viewer is one of the fundamental components of SemTUI, it allows
users to efficiently visualize a table and perform various kinds of action on
it. Before going into the details of each feature, the anatomy of the UI is
presented to the reader.

<div style={{textAlign: 'center'}}>
  <img style={{width: '600px'}} src="/I2T-docs/img/tableviewer.png" />
</div>

In the above figure the table viewer is shown with each major part highlighted
in red. Each region encloses within it, features that are logically related to
each other:
1. includes the name of the table, which can be changed anytime by the
user, and a last modified date visualized in a human readable format.
The last modified date gets updated each time an action changes the
data of the table, so that the UI can alert the user if there are changes
that have not yet been saved. If changes have been made and not yet
been saved, there are some UI elements and mechanisms to prevent the
user from losing its work. For example, after some changes, if the user
tries to navigate between the application pages, e.g.: navigate back
to the dashboard to select a new table to visualize its data, the user
is prompted with a warning message that he needs to confirm before
proceeding.

2. This section includes actions that can be performed on the whole table, also considered as global actions. Global actions affect the entire
visualization of the table, or trigger events that take into their contexts
the whole table. Starting from the component at the far left, a Button
Group enables a change to the current visualization of the table. At
the moment a table format and a raw format, showing the table data
as the W3C JSON structure representation, are currently developed
into the sytem. Alternative views may be developed to help users visualize results. For example, a graph view can be included to support
the visualization of the dependencies between the table elements and
their annotation mapped to a specific KG. The previously analyzed
tool [TableMiner+](https://eprints.whiterose.ac.uk/126465/1/iosart2c.pdf) includes this kind of visualization that may be
proven useful to less experienced users, giving them a better idea of the
obtained results. The second action available in this group allows the
user to start a full table annotation process. Then, an export and save features allow the user to
respectively export the table data in one of the available formats, and
save changes to the server. Finally, a section is dedicated to the settings
that may affect how some elements of the table are displayed, and a
tutorial to help guide users through the basics of the tool.

3. While the previous actions are included in the Toolbar component of
the table viewer, the following actions are part of the SubToolbar component. The SubToolbar is essentialy divided into two logic groups.
The first group is reserved to contextual actions which are enabled on
the selection of one or more table elements (cells, columns, or rows),
and may require some conditions to be met. Some of those functionalities are row/column deletion, cell inspection, reconciliation, extension.
For example, the extension action is enabled when one or more columns
are selected and the cells included in the selection have been already
reconciliated to a KG. This group of actions also includes the undo
functionality so that users can undo, or redo, changes applied to the
table.

4. The second group contained in the SubToolbar component, contains
actions related to table search and filtering.

5. The table footer is left to present the user with some statistics about the
table: the number of columns and rows, a percentage of the annotations
of the table cells, and some information displayed contextually to a
selection of cells.

6. Finally, the last component is the table. The table is built with a
set of fully modular sub-components, so that future changes can be
implemented with ease. To efficiently render a table, [React Table](https://react-table.tanstack.com/)
has been used. React Table provides a set of APIs to build lightweight,
fast and extensible tables. The peculiarity of this library is that it
doesn’t provide developers with prebuilt UI components, instead it is
a headless UI library which doesn’t supply any UI elements leaving
developers in full charge of utilizing performant APIs (as a set of React
Hooks) to design their own table UI. SemTUI has tables as its core
elements and, while it is still a prototype, it’s important to ensure that
it’s architecture is future-proof in terms of development.

## Table component
The table component is composed of multiple components so that it can be fully customizable by developers. React Table, on the other hand, provides all API and data structures to build it efficiently.

In the following snippets it is presented the structure of the table component. Each sub component will be imported and used by the main `Table` component:

```jsx title="Table components"
📦Table
 ┣ 📂EditableCell
 ┣ 📂NormalCell
 ┣ 📂SelectableHeader
 ┣ 📂SvgContainer
 ┣ 📂Table -> // Main table component
 ┣ 📂TableFooter
 ┣ 📂TableHead
 ┣ 📂TableHeaderCell
 ┣ 📂TableRoot
 ┣ 📂TableRow
 ┣ 📂TableRowCell
 ┗ 📜index.ts
```
