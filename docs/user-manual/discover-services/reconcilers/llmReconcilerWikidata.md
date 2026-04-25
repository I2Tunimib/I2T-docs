---
title: Custom Wikidata (LLM Reconciler)
sidebar_label: Custom Wikidata (LLM Reconciler)
---

# Custom Wikidata (LLM Reconciler)

> **Service Category:** RECONCILERS

### Description
A flexible LLM-powered reconciliation service that matches text values to Wikidata entities based on a custom prompt. Use the LLM to intelligently reconcile data to Wikidata knowledge base entities with custom matching logic.<br><br>" +
      `<strong>LLM model:</strong> ${process.env.LLM_MODEL || "phi4-mini"}<br><br>` +
      "<strong>Input</strong>: Column values to reconcile and custom instructions for matching.<br><strong>Output</strong>: Entity matches with Wikidata IDs, labels, descriptions, types, and confidence scores.<br><br><strong>How to use:</strong><br>Write instructions describing how to match the values. The LLM will receive each cell value and return Wikidata entity information.<br><br><strong>Example:</strong><br>Prompt: <code>Match this location to a Wikidata entity. Return the entity ID, name, description, and confidence score (0-100).</code>

---
:::info
This documentation is automatically generated from the backend source code.
:::
