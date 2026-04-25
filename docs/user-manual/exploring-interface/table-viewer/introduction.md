---
sidebar_position: 1
---

# Introduction
The SubToolbar provides a set of contextual actions that appear only when specific table elements—such as cells, columns,
or rows—are selected. Unlike global tools, these commands are applied exclusively to the current selection
and may require specific conditions.

<div style={{textAlign: 'center'}}>
  <img 
    src={require('@site/static/img/contextual-actions.png').default}
    alt="Contextual Actions" 
    style={{width: '80%'}} 
  />
</div>

The main contextual options include:
- **Undo/Redo**: Revert or re-apply specific changes, allowing you to experiment safely with different annotations and transformations.
- **Delete columns**: Remove the selected columns from the table.
- **Manage metadata**: View or edit metadata associated with the selected columns or cells. _(Learn more about [Matching Revision](../../enrichment-workflow/matching-revision))_
- **Refine matching**: Part of the enrichment process. _(Learn more about [Refinement](../../enrichment-workflow/matching-revision))_
- **Expand cell**: Open a detailed view containing reconciled data and linked information.
- **Expand header**: Visualize semantic relationships between reconciled entities within the column header.
- **Toggle dense/accessible view**: Switch the display style of selected columns to improve readability or data density.
- **Modification, Reconciliation and Extension**: Part of the enrichment process. _(Learn more about [Enrichment Workflow](../../enrichment-workflow/modification))_
- **Gen AI**: Leverage Large Language Models to perform advanced operations on your selection, including automated
  Modification, Reconciliation and Extension tasks tailored to the table's context. _(Learn more about [Generative AI](../../enrichment-workflow/generative-ai))_
