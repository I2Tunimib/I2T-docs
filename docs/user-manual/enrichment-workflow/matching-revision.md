---
sidebar_position: 3
---

# Matching Revision
If the reconciliation service is unable to assign a candidate entity to a cell, you can perform a Matching Revision.
SemT-X supports two types of revision:
- **Single Cell Entity Matching Revision**: Select one of the candidate entities for a single cell as correct 
  by setting the match tag to true, or add the correct entity manually. Optionally propagate the 
  choice to all identical cells in the same column.
- **Group of Cells Refinement**: Select a column (or a subset of cells) and refine the matching for all of them
  simultaneously.

## Single Cell Entity Matching Revision {#entity-matching-revision}
Once reconciliation is complete, you can review, correct, and validate results by inspecting the metadata associated with each cell.

1.  Click the <img src={require('@site/static/img/manage-metadata-button.png').default} width="22" style={{verticalAlign: 'middle', margin: '0 4px'}} /> 
    icon to open the _Manage Metadata_ dialog.
2.  Compare the different candidates by viewing their semantic types. 
3.  Choose your action:
      -  **If the correct entity is listed**, simply select the correct entity from the list.
      -  **If not listed**, search for it directly in external knowledge bases to retrieve its ID and URI.
          - Fill the required inputs, such as prefix, URL and name into the dedicated fields. 
          - Click on the `Add` button to add the correct entity in the candidates list.
4. Click on the `Confirm and Propagate` button to persist this match across the entire column.

:::tip
Watch this short video to see the Entity Matching Revision step in action:

<div style={{textAlign: 'center', margin: '1.5rem 0'}}>
  <iframe 
    width="100%" 
    style={{aspectRatio: '16/9', maxWidth: '600px'}}
    src="https://www.youtube.com/embed/4gUQJE8cHVQ" 
    title="SemT-X Entity Matching Revision" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
</div>
:::

## Group of Cells Refinement {#refinement}
The <img src={require('@site/static/img/refinement-button.png').default} width="28" style={{verticalAlign: 'middle'}} /> icon
allows you to refine the matching for a group of cells simultaneously. First, select a column or a specific subset of
its cells, then choose one of the following refinement methods:
- **Type Refine Matching**: Filter and confirm entities by choosing from the specific semantic types associated with the selected cells.
- **Score Refine Matching**: Validate or reject matches by applying a confidence score threshold.

![Refinement image](/img/refine-matching-automatic.gif)
