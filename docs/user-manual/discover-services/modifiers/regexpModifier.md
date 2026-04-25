---
title: Regular Expression Modifier
sidebar_label: Regular Expression Modifier
---

# Regular Expression Modifier

> **Service Category:** MODIFIERS

### Description
A transformation function that allows users to apply regular expression operations on text data, including pattern matching, replacement, and extraction of matched values.<br><br><strong>Common Examples:</strong><br><ul style='list-style-type: disc;'><li><strong>Extract numbers with up to 2 decimals:</strong> Pattern: <code>\\d+\\.\\d{1,2}</code> (without anchors)</li><li><strong>Truncate to 2 decimals:</strong> Operation: Replace, Pattern: <code>^(\\d+\\.\\d{2})\\d*$</code>, Replacement: <code>$1</code></li><li><strong>Extract email addresses:</strong> Pattern: <code>\\w+@\\w+\\.\\w+</code></li><li><strong>Remove special characters:</strong> Operation: Replace, Pattern: <code>[^a-zA-Z0-9\\s]</code>, Replacement: (empty)</li></ul><strong>Note:</strong> Use anchors (^ and $) only when you want to match the ENTIRE cell value. Without anchors, the pattern will match anywhere within the text.

---
:::info
This documentation is automatically generated from the backend source code.
:::
