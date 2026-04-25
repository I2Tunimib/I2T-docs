---
sidebar_position: 4
---

# Starting a project
Creating a project in SemT-X is the first step toward transforming your raw tabular data into 
semantically enriched knowledge. Once logged in, you will be redirect to the main dashboard.

:::tip
Watch this short clip (00:40 - 01:04) to see the authentication and dataset creation process in action:

<div style={{textAlign: 'center', margin: '1.5rem 0'}}>
  <iframe 
    width="100%" 
    style={{aspectRatio: '16/9', maxWidth: '600px'}}
    src="https://www.youtube.com/embed/vl11KucxCT0?start=40&end=64" 
    title="SemT-X Starting a Project" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
</div>
:::

## Uploading or Creating a Dataset
Before importing your tabular data, you must either upload your dataset (supported formats: .zip or .rar) containing multiple tables or
simply create an empty dataset by providing its name.

1. From the dashboard, click on `+ NEW DATASET`.
2. In the Add dataset Dialog, enter a Dataset name.
3. Upload a compressed dataset or create an empty dataset.
4. Click `Confirm` to initialize the dataset.

## Uploading a Table
Once your dataset is created and within the dataset view, you can import your specific data files (supported formats: .csv or .json):

1. Click on `+ NEW TABLE`.
2. In the Add table Dialog, select the file from your file system.
3. Optionally, provide a Table name.
4. Click `Confirm` to import the table.

## Searching for Datasets and Tables
As your workspace grows, you can quickly locate specific projects using the Search Bar located at the top of the dashboard.
- **Hybrid Results with Labels**: The dropdown menu displays both Datasets (folders) and Tables (files). To help you 
distinguish between result types, each item is marked with a specific label on the right (`dataset` or `table`).
- **Direct Access**: Clicking on a `table` result will take you directly to its table viewer, bypassing the dataset folder navigation.

## Entering the Workspace
After the upload is processed, your table will appear in the list within its dataset. Clicking on the table name
will open the Table Viewer, where you can begin the semantic enrichment process.
