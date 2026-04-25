---
title: SPARQL (Wikidata)
sidebar_label: SPARQL (Wikidata)
---

# SPARQL (Wikidata)

> **Service Category:** EXTENDERS

### Description
An extender that executes SPARQL queries on Wikidata for the entities in the selected column.<br><br><strong>Input</strong>: A <em>reconciled column</em> with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the<ul style="list-style-type: disc;"><li>SELECT clause (e.g., <code>?elevation ?unit ?unitLabel</code>).</li><li>Body of the query (e.g., <code>?item wdt:P2044 ?elevation</code>).</li><li>ORDER BY and LIMIT clause (optionally).</li></ul>While the variable <code>?item</code> is automatically included with the values from the selected column, andalso the VALUES clause is automatically added.<br><strong>Output</strong>: A new column for each selected variable containing the retrieved property values for each entity, returned as strings or numbers according to Wikidata property types.<br><br><strong>Notes</strong>: Some properties may be missing for certain entities in Wikidata. Ensure variable names correspond to properties used in the query body.

---
:::info
This documentation is automatically generated from the backend source code.
:::
