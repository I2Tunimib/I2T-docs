---
title: "Extenders"
sidebar_label: "Extenders"
---

# Extenders

Services that add complementary data or attributes to existing resources by fetching related information from external systems. Extenders typically operate on columns that have been previously reconciled, enriching them with new metadata or values.

---

## CH Matching - Private

An LLM-based Open Opportunities company house matching service. It uses a specialized hybrid search over a collection of European company data plus an LLM to reason about ambiguous or partial matches.<br /><br /><strong>Input</strong>: A column containing company name values (can be reconciled names or raw text).<br /><strong>Output</strong>: New columns such as:<ul ><li><code>company_official_name</code></li><li><code>company_number</code></li><li><code>company_address</code></li><li>Additional columns with LLM-based reasoning explanations (e.g., <code>llm_match_reason</code>, <code>llm_confidence</code>) that describe why a match was selected and any normalization or assumptions applied</li></ul>

---

## Geo Properties (Wikidata)

An extender that retrieves geographic properties from Wikidata for the entities in the selected reconciled column.<br /><br /><strong>Input</strong>: A <em>column reconciled against Wikidata</em>, with entities' ID in any supported format (e.g., <code>wd:Q42</code>), plus a <em>selection of geographic properties</em>:<ul ><li>Coordinate location (latitude & longitude)</li><li>Time zone</li><li>Postal code</li></ul><strong>Output</strong>: A new column for each selected property, populated with the corresponding values retrieved from Wikidata.<br /><br /><strong>Note</strong>: Some entities may lack one or more of the requested properties in Wikidata.

---

## COFOG (LLM Classifier)

A classification service that assigns a government department or public organization to the most appropriate category among the ten top-level COFOG (Classification of the Functions of Government - For more details, click <a href='https://en.wikipedia.org/wiki/Classification_of_the_Functions_of_Government' target='_blank'>here</a>.) options. The classification is based on the organization's name, description, country, and Wikidata metadata.<br /><br />"
      `<strong>LLM model:</strong> phi4-mini<br /><br />`
<strong>Input</strong>: Organization details including <em>name</em>, <em>description</em>, <em>country</em> and optional <em>Wikidata fields</em> such as description or type.<br /><strong>Output</strong>: New columns containing:<ul ><li>Predicted COFOG category (<code>cofog_label: 01-10</code>). </li><li>Confidence level (high/medium/low). </li><li>Reasoning notes</li></ul>

---

## Custom (LLM Extender)

A flexible LLM-powered extension service that generates new columns based on a custom prompt. Use the LLM to intelligently enrich your data by creating additional attributes derived from existing column values.<br /><br />"
      `<strong>LLM model:</strong> phi4-mini<br /><br />`
<strong>Input</strong>: Column values to extend and custom instructions describing how to extend them.<br /><strong>Output</strong>: New columns populated with LLM-generated content based on your specifications.<br /><br /><strong>How to use:</strong><br /><ul ><li>Specify output column names (comma-separated, e.g., 'summary, category, sentiment').</li><li>Write instructions for what to do with the cell data. The LLM will receive both your instructions and the actual cell data.</li><li>For each column, specify what value should be returned.</li></ul><strong>Example:</strong><br />Columns: <code>length, first_word, last_word</code><br />Prompt: <code>Count the characters and return as 'length'. Extract the first word as 'first_word' and the last word as 'last_word'.</code>

---

## Meteo Properties (OpenMeteo)

An extender that adds weather properties for the geographic points in the selected <em>reconclied column</em> (latitude, longitude) for a given date provided in another column.<br /><br /><strong>Input</strong>: A <em>column reconciled with latitute and longitude</em> (e.g., <code>georss:52.51604,13.37691</code>); a second <em>column with dates</em> in ISO8601 format (<code>yyyy-MM-dd</code> or <code>yyyy-MM-dd'T'HH:mm</code>), plus a <em>selection of weather properties</em>, based on the <em>selected granularity</em>:<ul ><li><em>Daily parameters</em>, returning values aggregated per day:<ul ><li>Number of seconds of daylight</li><li>Sun rise and set times UTC in ISO8601</li><li>Maximum daily temperature in °C</li><li>Minimum daily temperature in °C</li><li>Sum of daily precipitation (including rain, showers and snowfall) in mm</li><li>Number of hours with rain</li></ul></li><li><em>Hourly parameters</em>, returning values at a specific hour of a specific day:<ul ><li>Temperature at 2 meters above ground in °C</li><li>Relative humidity at 2 meters above ground in %</li><li>Precipitation (rain + snow) in mm</li></ul></li></ul><strong>Output</strong>: A new column for every requested parameter.<br /><br /><strong>Note</strong>: Only dates prior to 5 days of the current date are covered. All dates in CET timezone. If the date column contains full datetime (<code>yyyy-MM-dd'T'HH:mm</code>) and daily parameters are selected, the hour information will be ignored.

---

## Annotation properties

An extender that consolidates existing linking annotations by generating new column(s) containing <em>ID</em> and/or <em>name</em> values from the reconciled column.<br /><br /><strong>Input</strong>: A <em> reconciled column </em> against any dataset or knowledge graph; a <em> selection of the properties </em> to extract (ID in any supported format <code>prefix:id</code>, name as string).<br /> <strong>Output</strong>: One new column for each requested property, containing the extracted metadata from the reconciled entities.

---

## SPARQL (Wikidata)

An extender that executes SPARQL queries on Wikidata for the entities in the selected column.<br /><br /><strong>Input</strong>: A <em>reconciled column</em> with Wikidata entities; plus the variables and body of the SPARQL query. Specify the variables for the<ul ><li>SELECT clause (e.g., <code>?elevation ?unit ?unitLabel</code>).</li><li>Body of the query (e.g., <code>?item wdt:P2044 ?elevation</code>).</li><li>ORDER BY and LIMIT clause (optionally).</li></ul>While the variable <code>?item</code> is automatically included with the values from the selected column, andalso the VALUES clause is automatically added.<br /><strong>Output</strong>: A new column for each selected variable containing the retrieved property values for each entity, returned as strings or numbers according to Wikidata property types.<br /><br /><strong>Notes</strong>: Some properties may be missing for certain entities in Wikidata. Ensure variable names correspond to properties used in the query body.

---

