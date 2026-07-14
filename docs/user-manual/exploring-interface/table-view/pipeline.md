---
sidebar_position: 4
---

# Pipeline Control
The Pipeline provides a comprehensive overview of the enrichment workflow
applied to the table, tracking all the logs done by the user, such as get table, modifications, reconciliations,
extensions, cell entity link propagation, and save table. It automatically reconstructs the entire operational history—or
"timeline"—by ordering actions chronologically based on their timestamps.

Simply open the Pipeline control panel, located in the top-right of the SubToolbar, to visualize the enrichment operations 
in two distinct ways:
- **Sequential List**: A chronological log of all performed actions.
- **Tree View (DAG)**: A Directed Acyclic Graph (DAG) representation that maps the dependencies between operations.

This visualization allows you to understand how different operations relate to one another—for example, how an extension
might depend on a previous reconciliation.

## Operational Control and Dependencies
The system manages dependencies to maintain data consistency offering advanced management capabilities that go beyond
simple undo/redo actions:
- **Safe Deletion**: When no dependencies are violated.
- **Cascade Delete**: When deleting an operation that others depend on, all the dependent operations as well will be removed as well.

| Operation      | When can I delete an operation?                                                                                                             |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Reconciliation | Only if the result is not used by any Extension operation, or when Reconciliations done in sequence on the same column.                     |
| Extension      | Only if no Modification or Reconciliation operation is done using the column created by the operation or as context of another Extension    |
| Modification   | Only if the result or the newly created column is not used by any Reconciliation operation or used as support context from other operations |

:::info NOTE
Modification is considered a "destructive" operation because it directly edits cell values. Reversing them may require careful handling of the operation history: by ignoring 
the changes or store previous value of the column in the log (heavier).
:::

| Dependencies (To/From) | Reconciliation | Extension | Modification | Annotation Propagation |
|------------------------|----------------|-----------|--------------|------------------------|
| Reconciliation         | ❌             | ✅¹       | ✅¹          | ❌                    |
| Extension              | ✅             | ✅²       | ✅²          | ✅                    |
| Modification           | ❌             | ✅¹       | ✅¹          | ❌                    |
| Annotation Propagation | ✅             | ❌        | ❌           | ❌                    |

_¹: Includes Normal and Context dependencies._
_²: Includes Context dependencies._

:::info NOTE
While most enrichment operations are tracked, some actions—such as manual column deletion or automatic annotations—are
not currently part of the Pipeline history.
:::
