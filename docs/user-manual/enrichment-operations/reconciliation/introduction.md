---
sidebar_position: 1
---
import Link from '@docusaurus/Link';

# Introduction
The Reconciliation step is the process of matching entities in your original data with entities in external datasets. 
It provides access to both manual and automatic services to link cell labels (mentions) to entities in an external 
knowledge source:
- **Automatic with Semantic Table Interpretation**: Automatically reconciles all cells and provides semantic annotations for column headers.
    _(Learn more about [Semantic Table Interpretation](./automatic-reconciliation))_
- **Service-based**: Allows for reconciling a specific column or cell by selecting from various available reconciliation services.
  _(Learn more about [Reconcilers](../../discover-services/reconcilers))_
- **Manual**: You manually search for and assign a specific entity to a cell without using an automated service.
  _(Learn more about [Manual Reconciliation](./manual-reconciliation))_

## Annotation Symbols
The colors and shapes of the icons in front of reconciled entities provide visual feedback on the outcome of the reconciliation process:

<ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#4ac99b', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: The cell is annotated with an entity automatically assigned by the <b>reconciliation service</b>.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#106b4a', width: '9px', height: '5px', borderRadius: '5px', display: 'inline-block', marginRight: '11px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: An entity has been assigned by the <b>column refinement feature</b>. <i>(Learn more about <Link to="./matching-revision#refinement">Group of Cells Refinement</Link>)</i>
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#30a077', width: '5px', height: '9px', borderRadius: '5px', display: 'inline-block', marginRight: '15px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: An entity has been <b>manually</b> assigned to the cell. <i>(Learn more about <Link to="./matching-revision#entity-matching-revision">Single Cell Entity Matching Revision</Link>)</i>
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#ffc700', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Uncertain reconciliation</b>: Candidate entities were found above the threshold, but none were selected for the cell because multiple candidates have similar scores.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#f45725', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Unsuccessful reconciliation</b>: No candidate entities were found, or none of the scores reached the required confidence threshold.
  </li>
</ul>
