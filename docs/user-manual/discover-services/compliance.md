---
title: "Compliance"
sidebar_label: "Compliance"
---

# Compliance

Compliance services evaluate your data against privacy standards and regulatory frameworks (such as GDPR) to ensure data quality and legal safety.

---

## GDPR

An LLM-based service designed to evaluate the current state of a table's compliance with regulatory frameworks.
By analyzing data samples and column headers through the lens of a specified processing purpose, the system
determines whether the dataset falls under the scope of GDPR.

**Input**: The current table and a description of the data processing purpose.  
**Output**: A table overview (summary of GDPR status and confidence) and a detailed column analysis
(classification, suggested action, reasoning).

The possible table GDPR statuses include:

* **noGDPR**: The table contains no personal data and is outside the scope of GDPR.
* **yesGDPR**: The table contains identifiable personal data and is subject to GDPR requirements.
* **pseudoGDPR**: The table contains pseudonymized data; GDPR still applies, but the risk is reduced.

Column classifications:

* **personalData**: Directly identifies an individual (e.g., name, email).
* **quasiIdentifiers**: Could indirectly identify a person when combined with other data.
* **nonPersonalData**: Organizational or contextual information.
* **anonymousData**: Fully anonymized data.

Suggested actions:

* **noChange**: Data is already compliant.
* **pseudonymize**: Replace identifying values with pseudonyms or hashes.
* **generalize**: Reduce data specificity (e.g., exact dates to years).
* **remove**: Delete the column if unnecessary for the specified purpose.

![Compliance GIF](/img/compliance.gif)

---

