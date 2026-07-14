---
sidebar_position: 5
---

# Sharing and Access Control
SemT-X supports collaborative work through a two-level permission system, allowing you to manage access at the Dataset, 
and Table levels.

Access settings can be configured independently for:
- **Datasets**: Permissions applied to the entire dataset. 
- **Tables**: Permissions applied to individual tables within a dataset.
Permission intersections across these levels are possible; however, the system always enforces the most restrictive setting.

## Roles and Collaboration
As the Owner, you have full control over access management. You can add users by providing their username or email address
and assigning them one of the following roles:
- **Viewer**: Read-only access.
- **Editor**: Read-write access.

## Setting Visibility
To manage permissions, simply click on the `Access` button for the target Dataset or Table. You can choose from the
following visibility options:
- **Private**: Accessible only by the owner and by explicitly listed users (Viewers or Editors).
- **Public**: Accessible by any authenticated user (for tables, this remains subject to dataset-level access).
- **Inherit** from dataset (Table level only): The default setting, where the table adopts the permissions of its parent dataset.