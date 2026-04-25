---
sidebar_position: 3
---

# Filtering and Column Visibility
Manage your workspace by focusing on specific data subsets. Use the <img src={require('@site/static/img/filter.png').default} width="24" style={{verticalAlign: 'middle'}} /> icon
to filter rows based on their reconciliation status:

<ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#4ac99b', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>High-confidence matches (Successful)</b>: Rows where the service is certain of the entity assignment.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#ffc700', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>Uncertain matches (Uncertain)</b>: Rows that require manual review because the service found multiple candidates with similar scores.
  </li>
  <li style={{ marginBottom: '10px' }}>
    <span style={{ backgroundColor: '#f45725', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}></span>
    <b>High-confidence no matches (Unsuccessful)</b>: Rows where no suitable candidates were found above the confidence threshold.
  </li>
</ul>

_(Learn more about [Annotation Symbols](../../enrichment-workflow/reconciliation#annotation-symbols))_

Additionally, toggle column visibility using the <img src={require('@site/static/img/visibility.png').default} width="24" style={{verticalAlign: 'middle'}} /> 
icon. This dynamic list updates automatically as columns are added or removed, allowing you to hide auxiliary metadata
and focus on core information.

