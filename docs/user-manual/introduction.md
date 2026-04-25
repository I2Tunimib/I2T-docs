---
sidebar_position: 1
---

# Introduction

SemT-X is a framework designed to make tabular data more informative by integrating it with external knowledge sources. 
It provides an intuitive interface (SemT-UI) to explore tables, manage annotations, and enrich data with additional context.

In this user manual, you will find a comprehensive overview of SemT-UI’s components and the core workflow designed to enhance your data.

## Enrichment Workflow
The framework guides you through a structured process to turn raw data into high-quality semantic assets:
- **Modification**: Prepare your data by applying transformation functions—such as Date Formatter or Data Cleaning—to ensure consistency before enrichment. 
- **Reconciliation**: Link your mentions to entities in external Knowledge Bases (e.g., Wikidata or GeoNames). This can be done automatically for the full table or service-based selection or manually. 
- **Matching Revision**: Maintain full control over the reconciliation process by validating or correcting candidate entities at the cell level or through batch refinement and propagation across columns. 
- **Extension**: Once reconciled, enrich your table by fetching additional properties and metadata directly from the target knowledge bases.

## Advanced Features
To streamline this workflow, SemT-UI integrates advanced automation and safety tools. Features like **Automatic Annotation**
and **Generative AI** work in synergy to classify schemas (NER) and assist users with complex modification, reconciliation 
and extension tasks driven by Large Language Models.

While the data evolves, the system maintains transparency and security. Users can evaluate their datasets against 
regulatory standards like GDPR through the **Compliance Check**, while gaining a deeper understanding of the data structure 
via multiple **Visualization** modes—including interactive Tables, Raw JSON, and Knowledge Graphs. Once the enrichment is 
complete, the entire process can be exported via **Pipeline Generation**, transforming an interactive session into a 
reproducible Python or Jupyter workflow ready for full-scale data execution.


<!-- ## Framework

SemTUI is presented as a framework and not as a simple interface or service. SemTUI has been designed to be fully modular and customizable for every kind of future need. The backend server is a **NodeJS** server that can be enhanced with external reconciliation and extension services without the need of rewriting part of the architecture.

The same goes for the frontend UI which is built using **React** and with customizable components so that they can be easily modified and extended.

## Resources

The current release of the system is available here: **[semtui.io](http://titan-inside.disco.unimib.it:3003/)**

The github repository of the frontend is available here: **[SemTUI-frontend](https://github.com/I2Tunimib/I2T-frontend)**

The github repository of the backend is available here: **[SemTUI-backend](https://github.com/I2Tunimib/I2T-backend)** -->
