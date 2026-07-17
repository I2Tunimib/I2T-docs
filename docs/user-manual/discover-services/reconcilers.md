---
title: "Reconcilers"
sidebar_label: "Reconcilers"
---

# Reconcilers

Reconcilers are services responsible for aligning or enriching tabular data with semantic metadata.

---

## Geocoding: Geo Coordinates (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing _city-level or higher granularity_ with latitude, longitude, labels, and descriptions.

**Input**: A _column of location mentions_ to reconcile; plus optional information taken other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including _ID_, _latitude_,_longitude_, _label_ and _description_ in a W3C-compliant format.

**Note**: Requires access to the GeoNames service

---

## Geocoding: Geo Coordinates (HERE)

A geographic reconciliation service that links location mentions to HERE entries, providing _street-level or higher granularity_ with latitude, longitude, names, and descriptions.

**Input**: A _column of location mentions_ to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including _ID_ (formatted as `georss:lat,lon`), _name_ (official Latin name of the address) and _description_.

**Note**: Requires access to the HERE service

---

## Linking: GeoNames (GeoNames)

A geographic reconciliation service that links location mentions to GeoNames entries, providing _city-level or higher granularity_ with IDs, names, and descriptions, withoutexplicitly adding coordinates.

**Input**: A _column of location mentions_ to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including _ID_ (formatted as `geoCoord:lat,lon`), _label_ and _description_ in a W3C-compliant format.

**Note**: Requires access to the GeoNames service.

---

## Linking: In-Table Linking

A local reconciliation service that links values from a selected column to corresponding valuesin another column of the same table, treating the second column as reference metadata for enrichment.

**Input**: A _column to reconcile_; a _reference column_ containing target values to reconcile the selected column; an _URI prefix_ for generating URIs for matched values (e.g., `wd:`, `geo:`).  
**Output**: Local links between matching cells, enriched with the selected URI prefix.

**Note**: External APIs are called only to retrieve types and descriptions for the linked entities.

---

## Linking: Wikidata (LionLinker)

A reconciliation service using LionLinker for table annotation, linking mentions to Wikidata entities.

**Input**: A _column of mentions_ to reconcile; possibly additional columns providing context to improve reconciliation accuracy.  
**Output**: Annotations for each matched mention, including _ID_, _name_, _description_ and _types_.

**Note**: Requires access to the LionLinker service. More precise than OpenRefine-based reconciliation.

---

## Text Annotation: NER (GateNLP)

Annotates text cells with named entity spans using a GateNLP-based annotator. Returns W3C _TextPositionSelector_ annotations (character offsets) for each entity mention found in the cell text, and links entities to Wikidata candidates.

---

## Linking: Wikidata (Alligator)

A general purpose reconciliation service using Alligator to match mentions to Wikidata entities. It enriches _body cells_ (mentions) with Wikidata IDs, labels, descriptions, and types, and enriches _header cells_ (schema) with types and properties.

**Input**: A _column of mentions_ (strings) to reconcile; possibly additional columns providing context to improve reconciliation accuracy.  
**Output**: Metadata associated with body and schema cells in W3C compliant format, including _IDs_, _labels_, _descriptions_, _types_ and _properties_.

**Note**: Requires access to the Alligator service. More precise than OpenRefine-based reconciliation.

---

## Linking: Wikidata (OpenRefine)

A general purpose reconciliation service using the OpenRefine service, adding Wikidata IDs, labels, and descriptions.

**Input**: A _column of mentions_ (strings) to reconcile.  
**Output**: Metadata associated with mentions in row cells and schema headers, including _ID_, _label_ and _description_ in W3C-compliant format.

**Note**: Requires access to the OpenRefine reconciliation service; Reconciliation is performed without using other columns for context, which may reduce accuracy compared to other services.

---

