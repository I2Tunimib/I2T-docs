---
title: Linking: GeoNames (GeoNames)
sidebar_label: Linking: GeoNames (GeoNames)
---

# Linking: GeoNames (GeoNames)

> **Service Category:** RECONCILERS

### Description
A geographic reconciliation service that links location mentions to GeoNames entries, providing <em> city-level or higher granularity </em> with IDs, names, and descriptions, withoutexplicitly adding coordinates. <br><br><strong>Input</strong>: A <em>column of location mentions</em> to reconcile; plus optional information taken from other columns providing context to improve reconciliation accuracy.<br><strong>Output</strong>: Annotations for each matched mention, including <em> ID</em> (formatted as <code>geoCoord:lat,lon</code>), <em> label</em> and <em> description </em> in a W3C-compliant format.<br><br><strong>Note</strong>: Requires access to the GeoNames service.

---
:::info
This documentation is automatically generated from the backend source code.
:::
