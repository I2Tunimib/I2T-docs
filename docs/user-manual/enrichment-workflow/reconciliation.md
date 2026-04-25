---
sidebar_position: 2
---
import Link from '@docusaurus/Link';

# Reconciliation
The Reconciliation step is the process of matching entities in your original data with entities in external datasets. 
It provides access to both manual and automatic services to link cell labels (mentions) to entities in an external 
knowledge source:
- **Automatic**: It can be performed at two different levels:
  - **Full Table with Semantic Table Interpretation**: Automatically reconciles all cells and provides semantic annotations for column headers.
    _(Learn more about [Semantic Table Interpretation](../exploring-interface/toolbar/automatic-annotation#semantic-table-interpretation))_
  - **Schema Annotation**: Automatically identifies the data kind and assigns a Named Entity Recognition classification to each column.
    _(Learn more about [Schema Annotation](../exploring-interface/toolbar/automatic-annotation#schema-annotation))_
- **Service-based**: Allows for reconciling a specific column or cell by selecting from various available reconciliation services.
  _(Learn more about [Reconcilers](../introduction))_
- **Manual**: You manually search for and assign a specific entity to a cell without using an automated service.

## Service-based Reconciliation
Select a column or a set of cells and click the `Reconcile` button in the Toolbar. This allows you to choose a service
group and a specific service to match cell labels (mentions) against a Knowledge Graph.

:::tip
Watch this short clip (03:03 - 03:57) to see the Service-based Reconciliation step in action:

<div style={{textAlign: 'center', margin: '1.5rem 0'}}>
  <iframe 
    width="100%" 
    style={{aspectRatio: '16/9', maxWidth: '600px'}}
    src="https://www.youtube.com/embed/vl11KucxCT0?start=183&end=237" 
    title="SemT-X Reconciliation" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
</div>
:::

## Manual Reconciliation
If entity IDs for specific cells are known, you can manually reconcile them by simply clicking the <img src={require('@site/static/img/manage-metadata-button.png').default} width="28" style={{verticalAlign: 'middle'}} /> icon of a cell.
Choose the knowledge source prefix you want to use, fill in the required fields, and add the entity. You can then
persist this match across the table by clicking the `Confirm and Propagate` button.

![Manual Reconciliation image](/img/manual-reconciliation.gif)

## Annotation Symbols
The colors and shapes of the icons in front of reconciled entities provide visual feedback on the outcome of the reconciliation process:

<ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#4ac99b', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: The cell is annotated with an entity automatically assigned by the <b>reconciliation service</b>.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#106b4a', width: '9px', height: '5px', borderRadius: '5px', display: 'inline-block', marginRight: '11px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: An entity has been assigned by the <b>column refinement feature</b>. <i>(Learn more about <Link to="./manual-revision#refinement">Group of Cells Refinement</Link>)</i>
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#30a077', width: '5px', height: '9px', borderRadius: '5px', display: 'inline-block', marginRight: '15px', verticalAlign: 'middle' }}></span>
    <b>Successful reconciliation</b>: An entity has been <b>manually</b> assigned to the cell. <i>(Learn more about <Link to="./manual-revision#entity-matching-revision">Single Cell Entity Matching Revision</Link>)</i>
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
