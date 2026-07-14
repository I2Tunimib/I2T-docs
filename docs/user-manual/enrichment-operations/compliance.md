---
sidebar_position: 6
---

# Compliance
This feature evaluates the current state of your table's compliance with different regulatory frameworks.
Click on the `Compliance` button in the Toolbar and simply select one of the available compliance services. Currently, 
the system supports GDPR assessment, allowing you to determine if your data processing aligns with European privacy standards.
_(Learn more about [Compliance Services](../discover-services/compliance))_

:::info NOTE
This is a long-running asynchronous process, allowing you to continue working on other tables while it runs.
:::

## Feedbacks
Once the task is completed, you will receive a notification via a pop-up in the bottom-left corner of the screen. The
system provides a Compliance Report and immediate visual feedbacks to help you identify sensitive columns:
- **Column Badges**: In the Table View, the column headers are automatically updated with specific badges indicating
  the compliance status and the data classification (e.g., Personal Data, Quasi-Identifier). Hovering over these badges 
  displays detailed insights, including the reasoning with the confidence score of the classification.
- **Detailed Insights**: By opening the Column Metadata Dialog, you can view the results obtained from the compliance check
  for that column.

The compliance assessment is also integrated into the Graph Visualization to provide a semantic overview of your privacy
status with color-coded nodes for classification and a compliance summary including status, confidence, and reasoning.
_(Learn more about [Graph Visualization](../exploring-interface/graph-view/sidebar))_