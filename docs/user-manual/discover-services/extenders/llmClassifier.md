---
title: COFOG (LLM Classifier)
sidebar_label: COFOG (LLM Classifier)
---

# COFOG (LLM Classifier)

> **Service Category:** EXTENDERS

### Description
A classification service that assigns a government department or public organization to the most appropriate category among the ten top-level COFOG (Classification of the Functions of Government - For more details, click <a href='https://en.wikipedia.org/wiki/Classification_of_the_Functions_of_Government' target='_blank'>here</a>.) options. The classification is based on the organization's name, description, country, and Wikidata metadata.<br><br>" +
      `<strong>LLM model:</strong> ${process.env.LLM_MODEL || "phi4-mini"}<br><br>` +
      "<strong>Input</strong>: Organization details including <em>name</em>, <em>description</em>, <em>country</em> and optional <em>Wikidata fields</em> such as description or type.<br><strong>Output</strong>: New columns containing:<ul style='list-style-type: disc;'><li>Predicted COFOG category (<code>cofog_label: 01-10</code>). </li><li>Confidence level (high/medium/low). </li><li>Reasoning notes</li></ul>

---
:::info
This documentation is automatically generated from the backend source code.
:::
