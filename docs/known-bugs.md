---
sidebar_position: 7
---

# Known bugs

- When a file is uploaded in the wrong format, the backend doesn't provide a feedback and temporary files are left on the server. Further uploades might fail. To make the server work again temporary files should be deleted from the `tmp` folder and the backend should be restarted.
- The upload form is not reset when exited.
- In the expanded view of a column of the table, the tag besides an annotation isn't shown when the list of the candidate entities for a cell is expanded.
- The visualization of properties sometimes breaks.

# Improvements
