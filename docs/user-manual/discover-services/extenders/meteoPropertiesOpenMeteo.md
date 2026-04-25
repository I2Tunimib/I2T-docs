---
title: Meteo Properties (OpenMeteo)
sidebar_label: Meteo Properties (OpenMeteo)
---

# Meteo Properties (OpenMeteo)

> **Service Category:** EXTENDERS

### Description
An extender that adds weather properties for the geographic points in the selected <em>reconclied column</em> (latitude, longitude) for a given date provided in another column.<br><br><strong>Input</strong>: A <em>column reconciled with latitute and longitude</em> (e.g., <code>georss:52.51604,13.37691</code>); a second <em>column with dates</em> in ISO8601 format (<code>yyyy-MM-dd</code> or <code>yyyy-MM-dd'T'HH:mm</code>), plus a <em>selection of weather properties</em>, based on the <em>selected granularity</em>:<ul style="list-style-type: disc;"><li><em>Daily parameters</em>, returning values aggregated per day:<ul style="list-style-type: circle"><li>Number of seconds of daylight</li><li>Sun rise and set times UTC in ISO8601</li><li>Maximum daily temperature in °C</li><li>Minimum daily temperature in °C</li><li>Sum of daily precipitation (including rain, showers and snowfall) in mm</li><li>Number of hours with rain</li></ul></li><li><em>Hourly parameters</em>, returning values at a specific hour of a specific day:<ul style="list-style-type: circle"><li>Temperature at 2 meters above ground in °C</li><li>Relative humidity at 2 meters above ground in %</li><li>Precipitation (rain + snow) in mm</li></ul></li></ul><strong>Output</strong>: A new column for every requested parameter.<br><br><strong>Note</strong>: Only dates prior to 5 days of the current date are covered. All dates in CET timezone. If the date column contains full datetime (<code>yyyy-MM-dd'T'HH:mm</code>) and daily parameters are selected, the hour information will be ignored.

---
:::info
This documentation is automatically generated from the backend source code.
:::
