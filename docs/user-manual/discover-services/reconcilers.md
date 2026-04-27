---
title: "Reconcilers"
sidebar_label: "Reconcilers"
---

# Reconcilers

Reconcilers are services responsible for aligning or enriching tabular data with semantic metadata.

---

## Geocoding: Geo Coordinates (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing  <em> city-level or higher granularity </em> with latitude, longitude, labels, and descriptions.

**Input**: A <em>column of location mentions</em> to reconcile; plus optional information taken  other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including <em> ID</em>, <em> latitude</em>, <em> longitude</em>, <em> label</em> and <em> description </em> in a W3C-compliant format.

**Note**: Requires access to the GeoNames service

---

## Geocoding: Geo Coordinates (HERE)

A geographic reconciliation service that links location mentions to HERE entries, providing <em> street-level  or higher granularity </em> with latitude, longitude, names, and descriptions.

**Input**: A <em>column of location mentions</em> to reconcile; plus optional information taken  from other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including <em> ID</em> (formatted as  `georss:lat,lon`), <em> name</em> (official Latin name of the address) and  <em> description </em>.

**Note**: Requires access to the HERE service

---

## Linking: GeoNames (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries,  providing <em> city-level or higher granularity </em> with IDs, names, and descriptions, without explicitly adding coordinates.

**Input**: A <em>column of location mentions</em> to reconcile; plus optional information taken  from other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including <em> ID</em> (formatted as  `geoCoord:lat,lon`), <em> label</em> and <em> description </em> in a W3C-compliant format.

**Note**: Requires access to the GeoNames service.

---

## Linking: In-Table Linking

A local reconciliation service that links values from a selected column to corresponding values in another column of the same table, treating the second column as reference metadata for enrichment.

**Input**: A <em>column to reconcile</em>; a <em>reference column</em> containing target values  to reconcile the selected column; an <em>URI prefix</em> for generating URIs for matched values  (e.g., `wd:`, `geo:`).  
**Output**: Local links between matching cells, enriched with the selected URI prefix.

**Note**: External APIs are called only to retrieve types and descriptions for the linked entities.

---

## Linking: Wikidata (LionLinker)

A reconciliation service using LionLinker for table annotation, linking mentions to Wikidata entities.

**Input**: A <em>column of mentions</em> to reconcile; possibly additional columns  providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including <em>ID</em>, <em>name</em>,  <em>description</em> and <em>types</em>.

**Note**: Requires access to the LionLinker service. More precise than OpenRefine-based  reconciliation.

---

## Linking: Wikidata (Alligator)

A general purpose reconciliation service using Alligator to match mentions to Wikidata entities.  It enriches <em> body cells </em> (mentions) with Wikidata IDs, labels, descriptions, and types, and enriches  <em> header cells </em> (schema) with types and properties.

**Input**: A <em> column of mentions </em> (strings) to reconcile; possibly additional columns  providing context to improve reconciliation accuracy.  
**Output**: Metadata associated with body and schema cells in W3C compliant format, including  <em> IDs</em>, <em> labels</em>, <em> descriptions</em>, <em> types</em> and <em> properties</em>.

**Note**: Requires access to the Alligator service. More precise than OpenRefine-based  reconciliation.

---

## Linking: Wikidata (OpenRefine)

A general purpose reconciliation service using the OpenRefine service, adding Wikidata IDs, labels,  and descriptions.

**Input**: A <em>column of mentions</em> (strings) to reconcile.  
**Output**: Metadata associated with mentions in row cells and schema headers, including  <em>ID</em>, <em>label</em> and <em>description</em> in W3C-compliant format.

**Note**: Requires access to the OpenRefine reconciliation service; Reconciliation is performed  without using other columns for context, which may reduce accuracy compared to other services.

---

