---
sidebar_position: 3
---

# Sidebar
The Sidebar is divided into two main sections:
- **Fixed section**: Shows general information about the graph, such as the total number of nodes and links, and useful metrics.
- **Dynamic section**: Displays details of the currently selected node or link. Selecting an element in the graph updates this part automatically.

These two sections allow users to analyze the overall graph structure and inspect specific elements interactively.

## Graph Info
This fixed section displays general information about the entire graph:
- **Total Nodes**: Number of nodes in the graph. <br />
  `Show list` displays all nodes with their type (Subject, Entity, Literal). 
- **Total Links**: Number of edges connecting nodes. <br />
  `Show list` displays all links with their property and label. 
- **Graph Metrics**: Key metrics help analyze the graph structure semantically, such as **density** for spotting
  missing relations or sparse datasets, **max degree** to identify the node with the most connections, typically the most referenced entity, and so on.

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0' }}>
  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'flex-start' }}>
    <img src={require('@site/static/img/total-elements.png').default} style={{ width: '45%', maxWidth: '300px', height: 'auto' }} />
    <img src={require('@site/static/img/metrics.png').default} style={{ width: '45%', maxWidth: '300px', height: 'auto' }} />
  </div>
</div>

## Selected Node/Link Details
The second part of the Sidebar is dynamic and updates according to the element selected in the graph. After selecting an
element, this section can be collapsed using the `-` button, allowing you to hide the details and focus on the graph
general information when needed.

When an element is selected, the Sidebar shows contextual information:
- **Selected Node**: Displays semantic details about the node, including:
  - **Kind and role**: Describes its function in the graph.
  - **Types**: Represents its semantic classification.
  - **Incoming and outgoing connections**: Describes how the node is related to others in the graph.
- **Selected Link**: Displays information about the relationship between two nodes, including:
  - **Metadata Property**: Defines the relationship.
  - **Source and Target types**: Lists the associated types for each endpoint. <br />
    `Show types` expands all associated types to inspect their semantic meaning.

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0' }}>
  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'flex-start' }}>
    <img src={require('@site/static/img/node.png').default} style={{ width: '45%', maxWidth: '300px', height: 'auto' }} />
    <img src={require('@site/static/img/link.png').default} style={{ width: '45%', maxWidth: '300px', height: 'auto' }} />
  </div>
</div>

This dynamic view helps you understand both the structure of the graph and the semantics behind each connection, directly from the Sidebar.
