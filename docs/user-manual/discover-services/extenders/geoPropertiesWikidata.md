---
title: Geo Properties (Wikidata)
sidebar_label: Geo Properties (Wikidata)
---

# Geo Properties (Wikidata)

> **Service Category:** EXTENDERS

### Description
An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.<br><br><strong>Input</strong>: A <em>column reconciled against Wikidata</em>, with entities' ID in any supported format (e.g., <code>wd:Q42</code>), plus a <em>selection of geographic properties</em>:<ul style='list-style-type: disc;'><li>Coordinate location (latitude & longitude)</li><li>Time zone</li><li>Postal code</li></ul><strong>Output</strong>: A new column for each selected property, populated with the corresponding values retrieved from Wikidata.<br><br><strong>Note</strong>: Some entities may lack one or more of the requested properties in Wikidata.

---
:::info
This documentation is automatically generated from the backend source code.
:::
