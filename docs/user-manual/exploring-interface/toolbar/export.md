---
sidebar_position: 5
---

# Export
SemT-UI allows you to export your data or workflows in various formats tailored to your needs.
The available export options include:
- **Table**: Saves the data in standard formats such as _CSV_, _JSON (W3C Compliant)_ and _RDF_.
   - For _CSV_, you can customize the delimiter, quote character, decimal separator, and choose whether to include the header. 
   - For _RDF_, you can specify the serialization format, @base URI, filtering threshold, and match value.
- **Pipeline**: Generates a _Python script_ or a _Jupyter Notebook_ that represents your current table workflow.

:::info
Pipelines require all changes to be saved to the server before they can be exported.
:::

Once you have configured and confirmed the parameters, the file will be automatically downloaded.

:::tip
Watch this short video to see the Enrichment Pipeline Generation in action:

<div style={{textAlign: 'center', margin: '1.5rem 0'}}>
  <iframe 
    width="100%" 
    style={{aspectRatio: '16/9', maxWidth: '600px'}}
    src="https://www.youtube.com/embed/IcpzVJ6Nm7I" 
    title="SemT-X Starting a Project" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
</div>
:::
