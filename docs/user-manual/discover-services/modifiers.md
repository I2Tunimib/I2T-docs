---
title: "Modifiers"
sidebar_label: "Modifiers"
---

# Modifiers

Modifiers are services that process and transform data at the column level.

---

## Coordinate truncation Modifier

A transformation function that allows users to reduce the geographic precision of coordinate values by truncating decimal places, helping anonymize location data while preserving approximate positioning.

**Common Examples:**

* **Reduce to ~1km precision:** Input: `45.464664`, Decimal Places: `2`, Output: `45.46`
* **Reduce to ~111m precision:** Input: `45.464664`, Decimal Places: `3`, Output: `45.464`
* **Anonymize to city level:** Input: `45.464664`, Decimal Places: `1`, Output: `45.4`
* **Strip all decimals (country level):** Input: `45.464664`, Decimal Places: `0`, Output: `45`

**Precision Reference:**

* `4` decimal places → ~11 meter precision
* `3` decimal places → ~111 meter precision
* `2` decimal places → ~1.1 km precision
* `1` decimal place &nbsp;→ ~11 km precision
* `0` decimal places → ~111 km precision

**Note:** This technique is a form of _geographic masking_ — lower decimal values mean stronger anonymization but less spatial accuracy. Choose the precision level that balances your privacy and analytical needs.

**Input format:** Each row should contain a latitude and longitude separated by a comma (e.g. `45.464664,9.188540`). Use the _Decimal places_ field below to truncate each coordinate to the desired number of decimal digits.

---

## Data Cleaning

A transformation function that allows users to clean and normalize textual data by applying basictext operations such as trimming whitespace, changing case (lowercase, uppercase, titlecase).

---

## Date Formatter

A transformation function that converts date-like values in the selected column(s) into a standardized or custom date format, using date-fns library for date parsing and formatting.

---

## Pseudoanonymization

Pseudoanonymize or de-anonymize data in the selected column using encryption service. Choose between encrypting original values or decrypting vault keys.

---

## Regular Expression Modifier

A transformation function that allows users to apply regular expression operations on text data, including pattern matching, replacement, and extraction of matched values.

**Common Examples:**

* **Extract numbers with up to 2 decimals:** Pattern: `\\d\\.\\d{1,2}` (without anchors)
* **Truncate to 2 decimals:** Operation: Replace, Pattern: `^(\\d\\.\\d{2})\\d*$`, Replacement: `$1`
* **Extract email addresses:** Pattern: `\\w@\\w\\.\\w`
* **Remove special characters:** Operation: Replace, Pattern: `[^a-zA-Z0-9\\s]`, Replacement: (empty)

**Note:** Use anchors (^ and $) only when you want to match the ENTIRE cell value. Without anchors, the pattern will match anywhere within the text.

---

## Text Annotation: NER (GateNLP)

Annotates long-text cells with named entity spans using a GateNLP-based annotator. Returns W3C _TextPositionSelector_ annotations (character offsets) for each entity mention found in the cell text, stored under the `annotations` field in W3C compliant format.

---

## Text to columns / Columns to text

A transformation function that allows joining multiple columns into one or splitting a single column into multiple columns using a separator defined by the user or by extracting the first or last portion of the cell value.

---

## Text to rows

A transformation function that allows splitting the values of a single column into multiple rows using a custom separator defined by the user. For each split value, a new row is created and the values of the other columns are duplicated.

---

