---
sidebar_position: 1
---

# Automatic Schema Annotation
Simply click on the `Automatic Annotation` button in the Toolbar. Then, choose **Schema** as target and **Column Classifier**
as method. This process automatically identifies the **Kind** of the column (e.g., whether it contains entities or literal
values) and assigns a **Datatype/Semantic Class** based on the cell values:
- **For entities**: It distinguishes between _PERSON_, _PLACE_, _ORGANIZATION_, _EVENT_, or _OTHER_;
- **For literals**: It distinguishes between _NUMBER_, _DATE_, or _STRING_;

This classification is crucial as it guides the system in suggesting only the most relevant Wikidata properties to your
datatype.

Once the task is completed, you will receive a notification via a pop-up in the bottom-left corner of the screen.

![Schema Annotation](/img/schema-annotation.gif)