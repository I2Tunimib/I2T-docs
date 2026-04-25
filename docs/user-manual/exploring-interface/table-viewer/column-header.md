---
sidebar_position: 4
---

# Column Header
Each column header provides a set of actions to help you manage column efficiently:

<div style={{textAlign: 'center'}}>
  <img 
    src={require('@site/static/img/column-header.png').default}
    alt="Column Header Actions" 
    style={{width: '35%', marginBottom: '8px'}} 
  />
</div>

- **Pin or unpin columns**: Keep them fixed on the left side while scrolling through the table.
- **Manage metadata**: View or edit metadata associated with the column.
- **Drag and drop**: Reorder columns freely and customize your layout.
- **Resize columns**: Manually dragging their edges. To restore default widths, the reset button <img src={require('@site/static/img/reset.png').default} width="24" style={{verticalAlign: 'middle'}} /> 
  appears in the SubToolbar only after resizing.
- **Sort alphabetically**: Arrange cell values in ascending or descending order.
- **Sort by match score**: Prioritize cells with fully reconciled entities or unmatched ones.

Column headers also show the following data:
- **Kind**: Indicates whether they contain entities or literal values.
- **Reconciliation service name**: The source used for entity matching.
- **Reconciliation status**: Indicates whether they were fully, partially, or not reconciled.
- **Compliance check status**: Indicates whether the column is compliant with privacy standards or legal regulations.
