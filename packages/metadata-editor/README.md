# Metadata editor

Metadata editor will be a IIIF presentation 3 editor for descriptive properties.

## Usage

```js
<MetadataEditor
  manifestId="https://.."
  manifestJson={
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

Like the annotation studio, should bootstrap itself with the manifestJSON field and only re-update itself
when the manifestId changes. The controlled input will allow for implementers to hook into updates.
