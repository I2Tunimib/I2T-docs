---
sidebar_position: 1
slug: /
---

# Introduction

SemTUI is a framework for table annotation and extension, it allows to view and manipulate tabular data with the objective to **enrich** it. Imagine having a table with no header names, which content is generic and ambiguous data. SemTUI allows to **reconciliate** cell values to real-life entities with integrated services in a customizable backend server. Users can review metadata for specific cells with ambiguous entities or non-matches entities and provide feedback through an easy-to-use UI.
Tabular data, once reconciliated, can also be **extended** with data from other datasets through extension services provided in the backend server.

## Framework

SemTUI is presented as a framework and not as a simple interface or service. SemTUI has been designed to be fully modular and customizable for every kind of future need. The backend server is a **NodeJS** server that can be enhanced with external reconciliation and extension services without the need of rewriting part of the architecture.

The same goes for the frontend UI which is built using **React** and with customizable components so that they can be easily modified and extended.

## Resources

The current release of the system is available here: **[semtui.io](http://titan-inside.disco.unimib.it:3003/)**

The github repository of the frontend is available here: **[SemTUI-frontend](https://github.com/I2Tunimib/I2T-frontend)**

The github repository of the backend is available here: **[SemTUI-backend](https://github.com/I2Tunimib/I2T-backend)**