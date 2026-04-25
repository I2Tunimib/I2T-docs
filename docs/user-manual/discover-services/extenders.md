---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources by fetching related information from external systems. Extenders typically operate on columns that have been previously reconciled, enriching them with new metadata or values.

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.<br /><br /><strong>Input</strong>: A <em>column reconciled against Wikidata</em>, with entities' ID in any supported format (e.g., <code>

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected <em>reconclied column</em> (latitude, longitude) for a given date provided in another column.<br /><br /><strong>Input</strong>: A <em>column reconciled with latitute and longitude</em> (e.g., <code>

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing <em>ID</em> and/or <em>name</em> values from the reconciled column.<br /><br /><strong>Input</strong>: A <em> reconciled column </em> against any dataset or knowledge graph; a <em> selection of the properties </em> to extract (ID in any supported format <code>

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.<br /><br /><strong>Input</strong>: A <em>reconciled column</em> with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the<ul style="list-style-

---

