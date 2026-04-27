---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources.

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.

**Input**: A <em>column reconciled against Wikidata</em>, with entities' ID in any supported format (e.g., `wd:Q42`), plus a <em>selection of geographic properties</em>:  
* Coordinate location (latitude & longitude)
* Time zone
* Postal code

**Output**: A new column for each selected property, populated with the corresponding values retrieved from Wikidata.

**Note**: Some entities may lack one or more of the requested properties in Wikidata.

---

## Geo Route (HERE)

An extender that computes the route between the geographic points in the selected column <em>origin</em>and those in the selected <em>destination</em> column.

**Input**: A <em>column reconciled with latitute and longitude</em>; another <em>column containing either geo coordinates</em> (e.g., `georss:52.51604,13.37691`) or text labels of <em>Points of Interest (POI)</em>, plus a <em>selection of properties</em>:  
* Route duration in minute
* Route length in km
* Route path from origin to destination in polyline format

**Output**: A new column for each selected route property.

**Notes**: If the destination column contains POIs, enable the corresponding option so the service can resolve textual POI labels to geographic coordinates before computing the route.

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected <em>reconclied column</em> (latitude, longitude) for a given date provided in another column.

**Input**: A <em>column reconciled with latitute and longitude</em> (e.g., `georss:52.51604,13.37691`); a second <em>column with dates</em> in ISO8601 format (`yyyy-MM-dd` or `yyyy-MM-dd'T'HH:mm`), plus a <em>selection of weather properties</em>, based on the <em>selected granularity</em>.  

<em>Daily parameters</em>, returning values aggregated per day:
* Number of seconds of daylight
* Sun rise and set times UTC in ISO8601
* Maximum daily temperature in °C
* Minimum daily temperature in °C
* Sum of daily precipitation (including rain, showers and snowfall) in mm
* Number of hours with rain

<em>Hourly parameters</em>, returning values at a specific hour of a specific day:
* Temperature at 2 meters above ground in °C
* Relative humidity at 2 meters above ground in %
* Precipitation (rainsnow) in mm

**Output**: A new column for every requested parameter.

**Note**: Only dates prior to 5 days of the current date are covered. All dates in CET timezone. If the date column contains full datetime (`yyyy-MM-dd'T'HH:mm`) and daily parameters are selected, the hour information will be ignored.

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing <em>ID</em> and/or <em>name</em> values from the reconciled column.

**Input**: A <em> reconciled column </em> against any dataset or knowledge graph; a <em> selection of the properties </em> to extract (ID in any supported format `prefix:id`, name as string).  
**Output**: One new column for each requested property, containing the extracted metadata from the reconciled entities.

---

## Annotation properties (Wikidata)

An extender that extracts Wikidata metadata, such as <em>ID</em>, <em>URI</em>, <em>name</em>, <em>description</em>, from a reconciled column and populates them into new column(s).

**Input**: A <em>column reconciled against Wikidata</em>, plus a <em>selection of the properties</em>:  
* ID, in Wikidata format `wd:Q42`
* URI, as full URL
* Name, as string
* Description, as string

**Output**: A new column for each selected property, containing the corresponding Wikidata metadata.

---

## Wikidata properties

An extender that adds Wikidata properties for entities in the selected column.

**Input**: A <em>reconciled column</em> with entities; plus a <em>list of Wikidata properties</em> to retrieve, separated by space (e.g., P625 P2044).  
**Output**: A new column for each selected property, headed with the property\

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.

**Input**: A <em>reconciled column</em> with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the  
* SELECT clause (e.g., `?elevation ?unit ?unitLabel`).
* Body of the query (e.g., `?item wdt:P2044 ?elevation`).
* ORDER BY and LIMIT clause (optionally).

**Output**: A new column for each selected variable containing the retrieved property values for each entity, returned as strings or numbers according to Wikidata property types.

**Note**: While the variable `?item` is automatically included with the values from the selected column, also the VALUES clause is automatically added. Some properties may be missing for certain entities in Wikidata. Ensure variable names correspond to properties used in the query body.

---

