---
title: "Reconcilers"
sidebar_label: "Reconcilers"
---

# Reconcilers

Reconcilers are services responsible for aligning or enriching tabular data with semantic metadata. They achieve this by matching entities from the dataset with corresponding entries from external or internal knowledge sources, enabling semantic linking and enhanced interoperability.

---

## Geocoding: Geo Coordinates (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing <em> city-level or higher granularity </em> with latitude, longitude, labels, and descriptions.<br /><br /><strong>Input</strong>: A <em>column of location mentions</em> to reconcile; plus optional information taken other columns providing context to improve reconciliation accuracy.<br /><strong>Output</strong>: Annotations for each matched mention, including <em> ID</em>, <em> latitude</em>,<em> longitude</em>, <em> label</em> and <em> description </em> in a W3C-compliant format.<br /><br /><strong>Note</strong>: Requires access to the GeoNames service

---

## Geocoding: Geo Coordinates (HERE)

A geographic reconciliation service that links location mentions to HERE entries, providing <em> street-level or higher granularity </em> with latitude, longitude, names, and descriptions.<br /><br /><strong>Input</strong>: A <em>column of location mentions</em> to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.<br /><strong>Output</strong>: Annotations for each matched mention, including <em> ID</em> (formatted as <code>

---

## Linking: GeoNames (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing <em> city-level or higher granularity </em> with IDs, names, and descriptions, withoutexplicitly adding coordinates. <br /><br /><strong>Input</strong>: A <em>column of location mentions</em> to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.<br /><strong>Output</strong>: Annotations for each matched mention, including <em> ID</em> (formatted as <code>

---

## Linking: In-Table Linking

A local reconciliation service that links values from a selected column to corresponding valuesin another column of the same table, treating the second column as reference metadata for enrichment. <br /><br /><strong>Input</strong>: A <em>column to reconcile</em>; a <em>reference column</em> containing target values to reconcile the selected column; an <em>URI prefix</em> for generating URIs for matched values (e.g., <code>

---

## Linking: Wikidata (LionLinker)

A reconciliation service using LionLinker for table annotation, linking mentions to Wikidata entities. <br /><br /><strong>Input</strong>: A <em>column of mentions</em> to reconcile; possibly additional columns providing context to improve reconciliation accuracy.<br /><strong>Output</strong>: Annotations for each matched mention, including <em>ID</em>, <em>name</em>, <em>description</em> and <em>types</em>.<br /><br /><strong>Note</strong>: Requires access to the LionLinker service. More precise than OpenRefine-based reconciliation.

---

## Linking: Wikidata (Alligator)

A general purpose reconciliation service using Alligator to match mentions to Wikidata entities. It enriches <em> body cells </em> (mentions) with Wikidata IDs, labels, descriptions, and types, and enriches <em> header cells </em> (schema) with types and properties.<br /><br /> <strong>Input</strong>: A <em> column of mentions </em> (strings) to reconcile; possibly additional columns providing context to improve reconciliation accuracy.<br /><strong>Output</strong>: Metadata associated with body and schema cells in W3C compliant format, including <em> IDs</em>, <em> labels</em>, <em> descriptions</em>, <em> types</em> and <em> properties</em>.<br /><br /><strong>Note</strong>: Requires access to the Alligator service. More precise than OpenRefine-based reconciliation.

---

