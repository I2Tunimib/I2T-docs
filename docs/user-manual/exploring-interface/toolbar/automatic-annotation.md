---
sidebar_position: 4
---

# Automatic Annotation
This feature leverages semantic services to automatically annotate your data.
You can apply automatic annotation at two different levels:
1. **Full table**: Processes the entire table using a specific service like Alligator (Semantic Table Interpretation).
   This is currently the primary method for full-scale interpretation.
2. **Schema**: Focuses exclusively on the table columns using a specific service, such as the Column Classifier.

Once the process is complete, the table updates automatically. For **Full table** annotation, cells are
populated with predicted entities and metadata; for **Schema** annotation, columns are updated with Named
Entity Recognition (NER) and kind classifications.

## Semantic Table Interpretation
Click on the `Automatic Annotation` button in the Toolbar. Then, select **Full table** as target and **Semantic Table 
Interpretation (Alligator)** as the method.

:::info
This is a long-running asynchronous process, allowing you to continue working on other tables while it runs.
:::

Once the task is completed, you will receive a notification via a pop-up in the bottom-left corner of the screen.

![Automatic Annotation image](/img/automatic-annotation.gif)

## Schema Annotation
Simply click on the `Automatic Annotation` button in the Toolbar. Then, choose **Schema** as target and **Column Classifier** 
as method. This process automatically identifies the **Kind** of the column (e.g., whether it contains entities or literal 
values) and assigns a **NER Classification** based on the cell values:
- **For entities**: It distinguishes between _PERSON_, _LOCATION_, _ORGANIZATION_, or _OTHER_; 
- **For literals**: It distinguishes between _NUMBER_, _DATE_, or _STRING_;

This classification is crucial as it guides the system in suggesting only the most relevant Wikidata properties to your 
data type.

Once the task is completed, you will receive a notification via a pop-up in the bottom-left corner of the screen.

![Schema Annotation image](/img/schema-annotation.gif)
