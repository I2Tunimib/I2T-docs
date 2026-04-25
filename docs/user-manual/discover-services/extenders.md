---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources.

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected  reconciled column.

**Input**: A column reconciled against Wikidata, with entities' ID in any supported  format (e.g., `wd:Q42`), plus a selection of geographic properties: 
- Coordinate location (latitude & longitude)
- Time zone
- Postal code

<br>**Output**: A new column for each selected property, populated with the corresponding values  retrieved from Wikidata.

**Note**: Some entities may lack one or more of the requested properties in Wikidata.

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected reconclied  column (latitude, longitude) for a given date provided in another column.

**Input**: A column reconciled with latitute and longitude (e.g., `georss:52.51604, 13.37691`); a second column with dates in ISO8601 format (`yyyy-MM-dd` or  `yyyy-MM-dd'T'HH:mm`), plus a selection of weather properties, based on the selected granularity: 
Daily parameters, returning values aggregated per day: 
- Number of seconds of daylight
- Sun rise and set times UTC in ISO8601
- Maximum daily temperature in °C
- Minimum daily temperature in °C
- Sum of daily precipitation (including rain, showers and snowfall) in mm
- Number of hours with rain

Hourly parameters, returning values at a specific hour of a specific day: 
- Temperature at 2 meters above ground in °C
- Relative humidity at 2 meters above ground in %
- Precipitation (rain + snow) in mm

<br>**Output**: A new column for every requested parameter.

**Note**: Only dates prior to 5 days of the current date are covered. All dates in CET timezone.  If the date column contains full datetime (`yyyy-MM-dd'T'HH:mm`) and daily parameters are  selected, the hour information will be ignored.

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing  ID and/or name values from the reconciled column.

**Input**: A  reconciled column  against any dataset or knowledge graph;  a  selection of the properties  to extract (ID in any supported format `prefix:id`,  name as string).
<br>**Output**: One new column for each requested property, containing the  extracted metadata from the reconciled entities.

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.

**Input**: A reconciled column with Wikidata entities; plus the variables and body of the  SPARQL query. Specify the variables for the 
- SELECT clause (e.g., `?elevation ?unit ?unitLabel`).
- Body of the query (e.g., `?item wdt:P2044 ?elevation`).
- ORDER BY and LIMIT clause (optionally).

While the variable `?item` is automatically included with the values from the selected column, and also the VALUES clause is automatically added.
<br>**Output**: A new column for each selected variable containing the retrieved property values  for each entity, returned as strings or numbers according to Wikidata property types.

**Notes**: Some properties may be missing for certain entities in Wikidata.  Ensure variable names correspond to properties used in the query body.

---

