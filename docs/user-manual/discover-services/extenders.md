---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources.

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.

**Input**: A _column reconciled against Wikidata_, with entities' ID in any supported format (e.g., `wd:Q42`), plus a _selection of geographic properties_:  
* Coordinate location [<a href='https://www.wikidata.org/wiki/Property:P625' target='_blank' rel='noopener noreferrer'>P625</a>]
* Time zone [<a href='https://www.wikidata.org/wiki/Property:P421' target='_blank' rel='noopener noreferrer'>P421</a>]
* Postal code [<a href='https://www.wikidata.org/wiki/Property:P281' target='_blank' rel='noopener noreferrer'>P281</a>]

**Output**: A new column for each selected property, populated with the corresponding values retrieved from Wikidata.

**Note**: Some entities may lack one or more of the requested properties in Wikidata.

---

## Geo Route (HERE)

An extender that computes the route between the geographic points in the selected column _origin_and those in the selected _destination_ column.

**Input**: A _column reconciled with latitute and longitude_; another _column containing either geo coordinates_ (e.g., `georss:52.51604,13.37691`) or text labels of _Points of Interest (POI)_, plus a _selection of properties_:  
* Route duration in minute [<a href="https://www.wikidata.org/wiki/Property:P2047" target="_blank" rel="noopener noreferrer">P2047</a>]
* Route length in km  [<a href="https://www.wikidata.org/wiki/Property:P2043" target="_blank" rel="noopener noreferrer">P2043</a>]
* Route path from origin to destination in polyline format  [<a href="https://www.wikidata.org/wiki/Property:P2825" target="_blank" rel="noopener noreferrer">P2825</a>]

**Output**: A new column for each selected route property.

**Notes**: If the destination column contains POIs, enable the corresponding option so the service can resolve textual POI labels to geographic coordinates before computing the route.

---

## Geo Route (OSRM)

An extender that computes the route between the geographic points in the selected column _origin_and those in the selected _destination_ column.

**Input**: A _column reconciled with latitute and longitude_; another _column containing either geo coordinates_ (e.g., `georss:52.51604,13.37691`) or text labels of _Points of Interest (POI)_ already reconcilied with its coordinates, plus a _selection of properties_:  
* Route duration in minute [<a href="https://www.wikidata.org/wiki/Property:P2047" target="_blank" rel="noopener noreferrer">P2047</a>]
* Route length in km  [<a href="https://www.wikidata.org/wiki/Property:P2043" target="_blank" rel="noopener noreferrer">P2043</a>]
* Route path from origin to destination in polyline format  [<a href="https://www.wikidata.org/wiki/Property:P2825" target="_blank" rel="noopener noreferrer">P2825</a>]

**Output**: A new column for each selected route property.

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected _reconclied column_ (latitude, longitude) for a given date provided in another column.

**Input**: A _column reconciled with latitute and longitude_ (e.g., `georss:52.51604,13.37691`); a second _column with dates_ in ISO8601 format (`yyyy-MM-dd` or `yyyy-MM-dd'T'HH:mm`), plus a _selection of weather properties_, based on the _selected granularity_.  

_Daily parameters_, returning values aggregated per day:
* Number of seconds of daylight [<a href='https://www.wikidata.org/wiki/Property:P2047' target='_blank' rel='noopener noreferrer'>P2047</a>]
* Sun rise and set times UTC in ISO8601 [<a href='https://www.wikidata.org/wiki/Property:P2047' target='_blank' rel='noopener noreferrer'>P2047</a>]
* Maximum daily temperature in °C [<a href='https://www.wikidata.org/wiki/Property:P6591' target='_blank' rel='noopener noreferrer'>P6591</a>]
* Minimum daily temperature in °C [<a href='https://www.wikidata.org/wiki/Property:P7422' target='_blank' rel='noopener noreferrer'>P7422</a>]
* Sum of daily precipitation (including rain, showers and snowfall) in mm [<a href='https://www.wikidata.org/wiki/Property:P3036' target='_blank' rel='noopener noreferrer'>P3036</a>]
* Number of hours with rain [<a href='https://www.wikidata.org/wiki/Property:P2047' target='_blank' rel='noopener noreferrer'>P2047</a>]

_Hourly parameters_, returning values at a specific hour of a specific day:
* Temperature at 2 meters above ground in °C [<a href='https://www.wikidata.org/wiki/Property:P2076' target='_blank' rel='noopener noreferrer'>P2076</a>]
* Relative humidity at 2 meters above ground in % [<a href='https://www.wikidata.org/wiki/Property:P5596' target='_blank' rel='noopener noreferrer'>P5596</a>]
* Precipitation (rainsnow) in mm [<a href='https://www.wikidata.org/wiki/Property:P3036' target='_blank' rel='noopener noreferrer'>P3036</a>]

**Output**: A new column for every requested parameter.

**Note**: Only dates prior to 5 days of the current date are covered. All dates in CET timezone. If the date column contains full datetime (`yyyy-MM-dd'T'HH:mm`) and daily parameters are selected, the hour information will be ignored.

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing _ID_ and/or _name_ values from the reconciled column.

**Input**: A _reconciled column_ against any dataset or knowledge graph; a _selection of the properties_ to extract (ID in any supported format `prefix:id`, name as string [<a href='https://www.wikidata.org/wiki/Property:P1448' target='_blank' rel='noopener noreferrer'>P1448</a>]).  
**Output**: One new column for each requested property, containing the extracted metadata from the reconciled entities.

---

## Annotation properties (Wikidata)

An extender that extracts Wikidata metadata, such as _ID_, _URI_, _name_, _description_, from a reconciled column and populates them into new column(s).

**Input**: A _column reconciled against Wikidata_, plus a _selection of the properties_:  
* ID, in Wikidata format `wd:Q42`
* URI, as full URL [<a href="https://www.wikidata.org/wiki/Property:P856" target="_blank" rel="noopener noreferrer">P856</a>]
* Name, as string [<a href="https://www.wikidata.org/wiki/Property:P1448" target="_blank" rel="noopener noreferrer">P1448</a>]
* Description, as string

**Output**: A new column for each selected property, containing the corresponding Wikidata metadata.

---

## Wikidata properties

An extender that adds Wikidata properties for entities in the selected column.

**Input**: A _reconciled column_ with entities; plus a _list of Wikidata properties_ to retrieve, separated by space (e.g., P625 P2044).  
**Output**: A new column for each selected property, headed with the property\

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.

**Input**: A _reconciled column_ with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the  
* SELECT clause (e.g., `?elevation ?unit ?unitLabel`).
* Body of the query (e.g., `?item wdt:P2044 ?elevation`).
* ORDER BY and LIMIT clause (optionally).

**Output**: A new column for each selected variable containing the retrieved property values for each entity, returned as strings or numbers according to Wikidata property types.

**Note**: While the variable `?item` is automatically included with the values from the selected column, also the VALUES clause is automatically added. Some properties may be missing for certain entities in Wikidata. Ensure variable names correspond to properties used in the query body.

---

