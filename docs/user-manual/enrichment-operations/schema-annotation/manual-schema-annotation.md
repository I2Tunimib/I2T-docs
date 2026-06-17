---
sidebar_position: 2
---

# Manual Schema Annotation
The Schema Annotation can be done manually for each column by defining its semantic data. Simply click 
the <img src={require('@site/static/img/manage-metadata-button.png').default} width="22" style={{verticalAlign: 'middle', margin: '0 4px'}} />
icon of a column to open the _Manage Metadata Column_ dialog.

![Metadata Column Dialog image](/img/manage-metadata-column.png)

The first crucial choice determines how the systems treats your data:
- **Literal**, if the column contains raw values like numbers, dates, or text strings.
- **Named Entity**, if the column contains real-world entities (e.g., people, cities).

Once specified the Kind, define its specific classification:
- **Datatype (for Literal)**: It distinguishes between _NUMBER_, _DATE_, or _STRING_;
- **Semantic Class (for Named Entity)**: It distinguishes between _PERSON_, _PLACE_, _ORGANIZATION_, _EVENT_, or _OTHER_;

## Adding a Column Type
Simply click on the `Add column type` button to add a specific type. Browse external knowledge bases, such as Wikidata,
to search for the desired type and fill in the required input.

When working with literal datatypes, SemT-X provides tailored tools to handle formatting and scales:
- **QUDT Ontology (for NUMBER):** Search and assign official units of measure (e.g., *Count*, *Length*, *Degree Celsius*).
  For more details, click <a href='https://www.qudt.org/' target='_blank'>here</a>.
- **XML Schema (for STRING/DATE):** Aligns data validation with standard XML Schema structures. For more details, click 
  <a href='https://www.w3.org/TR/xmlschema-2/' target='_blank'>here</a>.

:::note
  Column types are automatically added during a reconciliation or extension step. In this case, based on the property 
  extracted, some information are automatically defined, such as column types and cell metadata are automatically added.
:::

## Adding a Column Property
Simply click on the `Add column property` button to add a specific property. Browse external property lists, such as Wikidata 
and Schema.org, filtered automatically according to the current schema.

Manually adding properties links columns together by defining the following **semantic triple**:
<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
  <img src={require('@site/static/img/semantic-triple.png').default} style={{ width: '40%', height: 'auto' }} />
</div>

:::tip
  As properties can only be assigned to **Entity** column, **Literal** columns can only be selected as _Object_.
  When dealing with Literal columns, simply define the _Subject_ by choosing from the Entity columns; 
  the property will be automatically created and added to that corresponding _Subject_ column.
:::

:::note
  Column properties are automatically added when providing support columns as context during the reconciliation step, and
  also, during the extension step, when extracting additional information.
:::

![Manual Schema Annotation image](/img/manual-schema-annotation.gif)
