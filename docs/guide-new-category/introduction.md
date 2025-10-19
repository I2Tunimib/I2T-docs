---
sidebar_position: 1
---

# Introduction

This section serves as a guide for future developers who may need to introduce a new
Service Category. It indicates the required steps to integrate the new category both in
the **backend** (core logic, API, configuration) and in the **frontend** (UI representation and interaction).

## Definition of Service Category

In the I2T framework, a Service Category defines a functional class of modules that
can interact with the system through a standardized interface.
Each category groups services that share a similar purpose and follow a common
input/output structure, allowing the framework to manage them uniformly through the
**External Service Aggregator**.

Existing categories include:
- **Reconcilers** – Services responsible for aligning or enriching metadata by matching
  entities with external sources (e.g., linking local data to external knowledge bases).
- **Extenders** – Services that add complementary data or attributes to existing resources,
  by fetching related information from external systems.
- **Modifiers** – Services that process and transform data, such as formatting, normalization,
  anonymization or restructuring operations applied to a column.

## Backend Integration

```jsx title="Backend folders and files to update and add"
📦src
 ┣ 📂api
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜config.controller.js
 ┃ ┃ ┗ 📜newCategoryService.controller.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜newCategoryService.route.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┗ 📜logger.js
 ┃ ┗ 📂services
 ┃   ┣ 📂logger
 ┃   ┃ ┗ 📜logger.service.js
 ┃   ┗ 📂newCategoryService
 ┃     ┣ 📜newCategoryService-pipeline.js
 ┃     ┗ 📜utils.js
 ┣ 📂config
 ┃ ┗ 📜index.js
 ┗ 📂services
   ┗ 📂newCategoryService 
```

## Frontend Integration

```jsx title="Frontend folders and files to update and add"
📦src
 ┣ 📂components
 ┃ ┗ 📂core
 ┃   ┗ 📂DynamicForm
 ┃     ┗ 📜DynamicForm.tsx
 ┣ 📂pages
 ┃ ┗ 📂Viewer
 ┃   ┗ 📂TableViewer
 ┃     ┣ 📂Menus
 ┃     ┃ ┗ 📂ContextMenus
 ┃     ┃   ┗ 📜ContextMenuColumn.tsx
 ┃     ┣ 📂NewCategoryServiceDialog
 ┃     ┣ ┗ 📜NewCategoryServiceDialog.tsx
 ┃     ┗ 📂SubToolbar
 ┃       ┗ 📜SubToolbar.tsx
 ┣ 📂services
 ┃ ┗ 📂api
 ┃   ┗ 📜table.ts
 ┗ 📂store
   ┗ 📂slices
     ┣ 📂config
     ┃ ┣ 📂interfaces
     ┃ ┃ ┗ 📂config.ts
     ┃ ┣ 📜config.selectors.ts
     ┃ ┗ 📜config.slice.ts
     ┗ 📂table
       ┣ 📂interfaces
       ┃ ┗ 📂table.ts
       ┣ 📜table.selectors.ts
       ┣ 📜table.thunk.ts
       ┗ 📜table.slice.ts
```
Here’s the table with coherent generic naming for a new service category:

| Concept                       | Existing Specific Name     | Generic Name for New Category        |
|-------------------------------|----------------------------|--------------------------------------|
| AsyncThunk / action           | modify                     | newCategoryService                   |
| Single service instance       | modifier                   | newCategory                          |
| Collection of services        | modifiers                  | newCategories                        |
| Operation / execution         | modification               | newServiceOperation                  |

## Example: Modifiers as new Category Service
Here’s how the new Category Service appears in the frontend:

![New Category Service Example](/img/new-category-service.gif)

The form dynamically renders all fields provided by the service and can be used directly by end users.
