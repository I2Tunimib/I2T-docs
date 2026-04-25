---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources by fetching related information from external systems. Extenders typically operate on columns that have been previously reconciled, enriching them with new metadata or values.

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.

**Input**: A *column reconciled against Wikidata*, with entities' ID in any supported format (e.g., `

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected *reconclied column* (latitude, longitude) for a given date provided in another column.

**Input**: A *column reconciled with latitute and longitude* (e.g., `

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing *ID* and/or *name* values from the reconciled column.

**Input**: A * reconciled column * against any dataset or knowledge graph; a * selection of the properties * to extract (ID in any supported format `

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.

**Input**: A *reconciled column* with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the

---

