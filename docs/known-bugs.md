---
sidebar_position: 9
---

# Known bugs

- When a file is uploaded in the wrong format, the backend doesn't provide a feedback and temporary files are left on the server. Further uploades might fail. To make the server work again temporary files should be deleted from the `tmp` folder and the backend should be restarted.
- The upload form is not reset when exited.
- In the expanded view of a column of the table, the tag besides an annotation isn't shown when the list of the candidate entities for a cell is expanded.
- The visualization of properties sometimes breaks.
- Links of the header column for the type and prop fields don't work, the links lead back the current table pageinstead of the entity page.
- Links of the header column for the entity field don't work.

# Improvements
- Disable the expand header function for the unreconciled cells.
- In the Refine Matching dialog the candidate reconcile options are showed sorted by score in ascending order instead of descending order.
- In the Refine Maching dialog add the possibility to search the different types with a search field. 
