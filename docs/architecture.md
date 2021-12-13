---
sidebar_position: 2
---

# Architecture

In this section is presented the general architecture of the framework.

The system is built with the idea of being fully modular so that the codebase can be maintained easier by future developers. The framework is mainly divided in two parts: a **frontend** and a **backend**.

![Framework Architecture](/img/architecture.png)

## Backend

The backend exposes various services to the frontend interface and therefore it is the only source of data. The backend has the role of integrating various external services and tries to make that process easier. It also handles datasets and tables files.

## Frontend

The frontend uses services exposed by the backend and presents their functionalities through an easy to use interface so that even non-experts users can utilize the tool for their possible needs (*e.g.: enrich data*). Therefore the UI has the main objective to abstract even complex services requirements to easy actions which users can perform.

