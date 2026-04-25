---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Extenders
Services that add complementary data or attributes to existing resources by fetching related information from external
systems. Extenders typically operate on columns that have been previously reconciled, enriching them with new metadata or values.

## Annotation Properties
An extender that consolidates linking annotations into new column(s) containing specific properties of entities from
a reconciled column. 

**Input**: a reconciled column against any dataset/knowledge graph, containing entity IDs (e.g., `prefix:id`) and names as
strings, along with the selection of desired properties (`ID`, `name`).  
**Output**: one new column for each requested property

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## Annotation Properties (Wikidata)
An extender that consolidates Wikidata properties into new column(s) based on a reconciled column.

**Input**: a column reconciled against Wikidata, containing entity IDs (e.g., `prefix:id`) and names, along with the selection
of desired properties (`ID`, `URL`, `name`, `description`).  
**Output**: one new column for each requested property.

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## COFOG Classifier
Classifies a government department or public organization into a single, top-level COFOG (Classification of the
Functions of Government) category. The classification is based on organization details such as name, description,
country, and Wikidata metadata, and selects the most appropriate category among the ten COFOG options

**Input**: organization details with user-selected columns for `description` and `country`.  
**Output**: a JSON object with the following fields:
- `cofog_label`: the COFOG category (01–10)
- `confidence`: confidence level of the classification (high, medium, low)
- `reasoning`: explanation of the selected category

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## Geo Properties (Wikidata)
An extender that adds selected geographic properties for entities in a column reconciled against Wikidata.

**Input**: a reconciled column containing Wikidata entity IDs, and a selection of desired properties (`Coordinate location`
(latitude & longitude), `Time zone`, `Postal code`).  
**Output**: one new column for each selected property.

:::note

Some properties may be missing in Wikidata.

:::

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## Meteo Properties (OpenMeteo)
An extender that adds weather-related properties for geographic points in a column reconciled with latitude and longitude.
Weather data can be retrieved for a specific day, with or without a time component. Users can:

- Select the data **granularity**, either daily (aggregated per day) or hourly (values at a specific hour). Depending on
  the choice, the following weather parameters are available:
  - **Daily** parameters: seconds of daylight, sunrise/sunset times UTC, maximum/minimum temperature (°C), total daily
    precipitation (mm), hours with rain
  - **Hourly** parameters: temperature at 2 m above ground (°C), relative humidity at 2 m (%), precipitation (mm)
- Optionally select whether to use a comma or period as the decimal separator.

**Input**: a column with geographic points (latitude, longitude) (e.g., `georss:52.51604,13.37691`) and a column with
dates in ISO8601 format (`yyyy-MM-dd` or `yyyy-MM-dd'T'HH:mm`).  
**Output**: one new column for each selected weather parameter. Values can use either comma or period as the decimal
separator, according to user preference.

:::note

- Only dates up to 5 days before the current date are covered. 
- All dates are considered in CET timezone. 
- If the date column contains full datetime (`yyyy-MM-dd'T'HH:mm`) and daily parameters are selected, the hour component is ignored.

:::

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## SPARQL (Wikidata)
Retrieves properties from Wikidata using custom SPARQL queries. Allows extraction of any data available for entities
in the selected column.

**Input**: a column reconciled with Wikidata entities, along with a SPARQL query composed of:
- `SELECT ?item` (e.g., `?elevation ?unit`)
- `WHERE { VALUES { ... } *body* }` (e.g., `?item wdt:P2044 ?elevation`)
- Optionally, `ORDER BY` and/or `LIMIT` 
**Output**: one new column for each variable returned by the query.

:::note

- The variable `?item` is automatically included with values from the selected column. 
- A `VALUES` clause is automatically added. 
- Some requested properties may be missing in Wikidata.

:::

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>

## Wikidata Properties
Retrieves specific properties for entities in a column reconciled with Wikidata. For each selected property, a new
column is added containing the values of that property. Users can use the **Suggest** button to retrieve a list of
available properties and their frequencies.

**Input**: a reconciled column and a list of Wikidata property IDs (e.g., `P625 P2044`).  
**Output**: one new column per selected property, headed with the Wikidata property name.

:::note

- Only one value per property per entity is returned. 
- Some property values may be missing in Wikidata.

:::

<Tabs>
<TabItem value="Pseudoanonymize" label="Pseudoanonymize">

```js title="Input Pseudoanonymize"
...
```
</TabItem>
<TabItem value="De-anonymize" label="De-anonymize">

```js title="Output De-anonymize"
...
```
</TabItem>
</Tabs>
