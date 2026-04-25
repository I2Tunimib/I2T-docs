---
title: Linking: In-Table Linking
sidebar_label: Linking: In-Table Linking
---

# Linking: In-Table Linking

> **Service Category:** RECONCILERS

### Description
A local reconciliation service that links values from a selected column to corresponding valuesin another column of the same table, treating the second column as reference metadata for enrichment. <br><br><strong>Input</strong>: A <em>column to reconcile</em>; a <em>reference column</em> containing target values to reconcile the selected column; an <em>URI prefix</em> for generating URIs for matched values (e.g., <code>wd:</code>, <code>geo:</code>). <br><strong>Output</strong>: Local links between matching cells, enriched with the selected URI prefix. <br><br><strong>Note</strong>: External APIs are called only to retrieve types and descriptions for the linked entities.

---
:::info
This documentation is automatically generated from the backend source code.
:::
