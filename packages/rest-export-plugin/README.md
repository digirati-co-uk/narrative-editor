# REST Export plugin

This is a planned plugin that will deal with REST endpoints, allowing finished manifest to be
exported to an external backend.

## Usage

```js
<RestExportPlugin
  manifestJson={
    {
      /* ... */
    }
  }
  apiEndpoint="https://"
  onSuccess={response => {
    /* ... */
  }}
  onError={(error, detail) => {
    /* ... */
  }}
/>
```
