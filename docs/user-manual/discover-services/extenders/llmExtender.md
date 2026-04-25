---
title: Custom (LLM Extender)
sidebar_label: Custom (LLM Extender)
---

# Custom (LLM Extender)

> **Service Category:** EXTENDERS

### Description
A flexible LLM-powered extension service that generates new columns based on a custom prompt. Use the LLM to intelligently enrich your data by creating additional attributes derived from existing column values.<br><br>" +
      `<strong>LLM model:</strong> ${process.env.LLM_MODEL || "phi4-mini"}<br><br>` +
      "<strong>Input</strong>: Column values to extend and custom instructions describing how to extend them.<br><strong>Output</strong>: New columns populated with LLM-generated content based on your specifications.<br><br><strong>How to use:</strong><br><ul style='list-style-type: decimal;'><li>Specify output column names (comma-separated, e.g., 'summary, category, sentiment').</li><li>Write instructions for what to do with the cell data. The LLM will receive both your instructions and the actual cell data.</li><li>For each column, specify what value should be returned.</li></ul><strong>Example:</strong><br>Columns: <code>length, first_word, last_word</code><br>Prompt: <code>Count the characters and return as 'length'. Extract the first word as 'first_word' and the last word as 'last_word'.</code>

---
:::info
This documentation is automatically generated from the backend source code.
:::
