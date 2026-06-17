---
sidebar_position: 2
---

# Graph Area
At the top left of the Graph Area, a legend indicates the meaning of the node colors:
<ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#2ecc71', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Subject</b>: Main entities or key columns in the dataset.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#3498db', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Entity</b>: Related objects or semantic concepts connected to Subjects.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#e67e22', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Literal</b>: Concrete values from the table (like strings, numbers, or dates).
  </li>
</ul>

<div style={{textAlign: 'center'}}>
  <img 
    src={require('@site/static/img/graph-area.png').default}
    alt="Graph Area" 
    style={{width: '80%', marginBottom: '8px'}} 
  />
</div>

You can explore and interact with the graph using the following actions:
- Hover over a node to display its metadata.
- Hover over a link to show its property and label.
- Hide/Show link label to toggle between viewing just the property or both the property and the label when hovering over a link
  by clicking on the respective button in the top right.
- Select a node to view its detailed information in the Sidebar and the corresponding data in the Column Values section.
- Select a link to view its detailed information in the Sidebar.

## Column Values
Located at the bottom left of the Graph Area, this section is tightly connected to node selection. Initially, the area 
displays a **suggestion** inviting the user to select a graph element. Once a node is selected, the table updates
automatically to display the values of the corresponding column.

<div style={{textAlign: 'center'}}>
  <img 
    src={require('@site/static/img/suggestion.png').default}
    alt="Suggestion" 
    style={{width: '35%', marginBottom: '8px'}} 
  />
</div>

This view allows you to:
- Inspect the **actual data values** associated with a semantic node, scrolling through the table.
- Check the **kind, role and types** of a node by observing its content.
- Identify patterns, repetitions, missing values, or inconsistencies in the data.

<div style={{textAlign: 'center'}}>
  <img 
    src={require('@site/static/img/column-values.png').default}
    alt="Column Values" 
    style={{width: '35%', marginBottom: '8px'}} 
  />
</div>

The Column Values table acts as a bridge between the graph representation and the concrete data stored in the dataset,
supporting both semantic analysis and data quality inspection.
