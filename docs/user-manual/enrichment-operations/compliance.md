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

## Report Exportation
Once reviewed the Compliance Report, you can export it in JSON or Markdown format to share or archive the results.
```js title="Example (JSON Export)"
{
  "userId": 0, 
  "date": "2026-09-01T22:18:39.526Z",
  "serviceName": "GDPR",
   "result": [
    {
      "table": {
        "gdpr": "yesGDPR",
        "reasoning": "The table contains personal data. Specifically, the 'Manager' and 'Team Captain' columns list full names of identifiable natural persons (e.g., 'José Mourinho', 'Michael Carrick'). While 'Match ID' is a quasi-identifier, the inclusion of specific individual names makes the dataset subject to GDPR. The 'Match Date' is a date but lacks precise timestamps or personal context that would elevate it to personal data on its own, though combined with names, it adds context. The other columns are organizational or non-personal data.",
        "score": 0.95,
        "sourceTable": "Football Matches 2017_annotated"
      }
    },
    {
      "Match ID": {
        "classification": "quasiIdentifiers",
        "action": "pseudonymize",
        "reasoning": "The 'Match ID' (e.g., 'match_12') is a unique identifier for a specific event. While not a direct personal identifier, in combination with other data (like specific match details), it could potentially identify a specific context involving individuals. However, since the primary risk here is the names, and 'Match ID' is an internal reference, it can be kept as is if no other identifiers are present, but to minimize risk and align with best practices for anonymized datasets, pseudonymizing it (e.g., to 'match_001') is safer. Given the instruction to suggest actions for compliance, and considering it's a unique key that could be linked to other datasets, pseudonymizing reduces risk. Alternatively, if the purpose is purely general data processing without linking, 'noChange' might be acceptable, but 'pseudonymize' is the safer recommendation for a dataset containing personal data to ensure isolation.",
        "score": 0.85
      },
      "Football Club": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains the name of a sports organization (e.g., 'Newcastle United'), not a natural person. It does not identify an individual and is not subject to GDPR.",
        "score": 1
      },
      "Manager": {
        "classification": "personalData",
        "action": "pseudonymize",
        "reasoning": "This column contains full names of specific individuals (e.g., 'José Mourinho'). These are direct identifiers of natural persons. To comply with GDPR for general data processing where the specific identity might not be strictly necessary, the data should be pseudonymized (e.g., 'Manager_001').",
        "score": 1
      },
      "Team Captain": {
        "classification": "personalData",
        "action": "pseudonymize",
        "reasoning": "This column contains full names of specific individuals (e.g., 'Michael Carrick'). These are direct identifiers of natural persons. To comply with GDPR, the data should be pseudonymized.",
        "score": 1
      },
      "Supplier": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains the name of a commercial entity (e.g., 'Adidas'). It does not identify a natural person and is not subject to GDPR.",
        "score": 1
      },
      "Match Date": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains a date (e.g., '2017-11-29'). While it is a piece of information, it does not directly identify a natural person on its own. It is not a timestamp with person context. It is non-personal data.",
        "score": 0.9
      },
      "Match Location": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains the name of a stadium or venue (e.g., 'Friedrichshafen'). While it could be a quasi-identifier if combined with other data, in isolation it does not identify a natural person. It is non-personal data.",
        "score": 0.9
      },
      "Match Country": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains a country name (e.g., 'Germany'). It is general geographic data and does not identify a natural person. It is non-personal data.",
        "score": 1
      },
      "Match Location_precipitation_hours": {
        "classification": "nonPersonalData",
        "action": "noChange",
        "reasoning": "This column contains a numerical value representing weather data (e.g., '20'). It is purely quantitative and does not identify any natural person. It is non-personal data.",
        "score": 1
      }
    }
  ]
}
```