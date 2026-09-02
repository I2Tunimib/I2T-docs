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

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0' }}>
  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'flex-start' }}>
    <img src={require('@site/static/img/dataset-control.png').default} style={{ width: '45%', maxWidth: '400px', height: 'auto', border: '1px solid #eaeaea', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
    <img src={require('@site/static/img/table-control.png').default} style={{ width: '45%', maxWidth: '400px', height: 'auto', border: '1px solid #eaeaea', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
  </div>
</div>

## Roles and Collaboration
As the Owner, you have full control over access management. You can add users by providing their username or email address
and assigning them one of the following roles:
- **Viewer**: Read-only access.
- **Editor**: Read-write access.

:::info NOTE
To ensure data consistency, when an Editor is actively editing a table, other collaborators (including other Editors)
will have read-only access until the session is closed.
:::

## Setting Visibility
To manage permissions, simply click on the `Access` button for the target Dataset or Table. You can choose from the
following visibility options:
- **Inherit** from dataset (Table level only): The default setting, where the table adopts the permissions of its parent dataset.
- **Private**: Accessible only by the owner and by explicitly listed users (Viewers or Editors).
- **Public**: Accessible by any authenticated user (for tables, this remains subject to dataset-level access).