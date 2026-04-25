---
title: "Modifiers"
sidebar_label: "Modifiers"
---

# Modifiers

Modifiers are services that process and transform data at the column level. They are typically used to perform operations such as formatting, normalization, anonymization, or restructuring of table data. Each modifier defines a specific transformation logic that can either update existing values or generate new columns based on user-defined parameters.

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

A transformation function that allows users to apply regular expression operations on text data, including pattern matching, replacement, and extraction of matched values.<br /><br /><strong>Common

---

## Text to columns / Columns to text

A transformation function that allows joining multiple columns into one or splitting a single column into multiple columns using a separator defined by the user or by extracting the first or last portion of the cell value.

---

## Text to rows

A transformation function that allows splitting the values of a single column into multiple rows using a custom separator defined by the user. For each split value, a new row is created and the values of the other columns are duplicated.

---

