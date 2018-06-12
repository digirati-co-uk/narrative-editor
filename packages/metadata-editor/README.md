# Metadata editor

Metadata editor will be a IIIF presentation 3 editor for descriptive properties. It can be
provided with the JSON of a Manifest, Canvas or Range and provide an editing UI for that
resource.

## Usage

```js
<MetadataEditor
  rsourceId="https://.."
  resourceJson={
    {
      /* ... */
    }
  }
  onUpdateField={(fieldName, value) => {
    /* ... */
  }}
  onRemoveField={fieldName => {
    /*...*/
  }}
  onUpdateMetadata={(fieldName, label, value) => {
    /*...*/
  }}
  onRemoveMetadataField={fieldName => {
    /*...*/
  }}
  onMetadataOrderUpdated={newOrder => {
    /* ... */
  }}
/>
```

Like the annotation studio, should bootstrap itself with the resourceJSON field and only re-update itself
when the resourceId changes. The controlled input will allow for implementers to hook into updates.

Its likely that this will be situated in a sidebar or popup, so it should remain a quite compact component.
