---
title: CH Matching - Private
sidebar_label: CH Matching - Private
---

# CH Matching - Private

> **Service Category:** EXTENDERS

### Description
An LLM-based Open Opportunities company house matching service. It uses a specialized hybrid search over a collection of European company data plus an LLM to reason about ambiguous or partial matches.<br><br><strong>Input</strong>: A column containing company name values (can be reconciled names or raw text).<br><strong>Output</strong>: New columns such as:<ul style='list-style-type: disc;'><li><code>company_official_name</code></li><li><code>company_number</code></li><li><code>company_address</code></li><li>Additional columns with LLM-based reasoning explanations (e.g., <code>llm_match_reason</code>, <code>llm_confidence</code>) that describe why a match was selected and any normalization or assumptions applied</li></ul>

---
:::info
This documentation is automatically generated from the backend source code.
:::
