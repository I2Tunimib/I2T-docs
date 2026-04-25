---
title: "Reconcilers"
sidebar_label: "Reconcilers"
---

# Reconcilers

Reconcilers are services responsible for aligning or enriching tabular data with semantic metadata. They achieve this by matching entities from the dataset with corresponding entries from external or internal knowledge sources, enabling semantic linking and enhanced interoperability.

---

## Geocoding: Geo Coordinates (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing * city-level or higher granularity * with latitude, longitude, labels, and descriptions.

**Input**: A *column of location mentions* to reconcile; plus optional information taken other columns providing context to improve reconciliation accuracy.

**Output**: Annotations for each matched mention, including * ID*, * latitude*,* longitude*, * label* and * description * in a W3C-compliant format.

**Note**: Requires access to the GeoNames service

---

## Geocoding: Geo Coordinates (HERE)

A geographic reconciliation service that links location mentions to HERE entries, providing * street-level or higher granularity * with latitude, longitude, names, and descriptions.

**Input**: A *column of location mentions* to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.

**Output**: Annotations for each matched mention, including * ID* (formatted as `

---

## Linking: GeoNames (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing * city-level or higher granularity * with IDs, names, and descriptions, withoutexplicitly adding coordinates. 

**Input**: A *column of location mentions* to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.

**Output**: Annotations for each matched mention, including * ID* (formatted as `

---

## Linking: In-Table Linking

A local reconciliation service that links values from a selected column to corresponding valuesin another column of the same table, treating the second column as reference metadata for enrichment. 

**Input**: A *column to reconcile*; a *reference column* containing target values to reconcile the selected column; an *URI prefix* for generating URIs for matched values (e.g., `

---

## Linking: Wikidata (LionLinker)

A reconciliation service using LionLinker for table annotation, linking mentions to Wikidata entities. 

**Input**: A *column of mentions* to reconcile; possibly additional columns providing context to improve reconciliation accuracy.

**Output**: Annotations for each matched mention, including *ID*, *name*, *description* and *types*.

**Note**: Requires access to the LionLinker service. More precise than OpenRefine-based reconciliation.

---

## Linking: Wikidata (Alligator)

A general purpose reconciliation service using Alligator to match mentions to Wikidata entities. It enriches * body cells * (mentions) with Wikidata IDs, labels, descriptions, and types, and enriches * header cells * (schema) with types and properties.

 **Input**: A * column of mentions * (strings) to reconcile; possibly additional columns providing context to improve reconciliation accuracy.

**Output**: Metadata associated with body and schema cells in W3C compliant format, including * IDs*, * labels*, * descriptions*, * types* and * properties*.

**Note**: Requires access to the Alligator service. More precise than OpenRefine-based reconciliation.

---

