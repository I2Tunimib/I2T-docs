---
sidebar_position: 4
---

# Automatic Annotation
This feature leverages semantic services to automatically annotate your data.
You can apply automatic annotation at two different levels:
1. **Full table**: Processes the entire table using a specific service like Alligator (Semantic Table Interpretation).
   This is currently the primary method for full-scale interpretation.
   _(Learn more about [Semantic Table Interpretation](../../enrichment-operations/reconciliation/automatic-reconciliation))_
2. **Schema**: Focuses exclusively on the table columns using a specific service, such as the Column Classifier. 
   _(Learn more about [Automatic Schema Annotation](../../enrichment-operations/schema-annotation/automatic-schema-annotation))_

Once the process is complete, the table updates automatically. For **Full table** annotation, cells are
populated with predicted entities and metadata; for **Schema** annotation, columns are updated with Named
Entity Recognition (NER) and kind classifications.