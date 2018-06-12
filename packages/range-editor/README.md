# Range editor

An editing interface for ranges, with support for custom behaviours.

```js
<RangeEditor
  manifestId="https://..."
  manifestJson={
    {
      /* ... */
    }
  }
  onAddRange={(range, index) => {
    /* ... */
  }}
  onChangeRange={(range, index) => {
    /* ... */
  }}
  onRemoveRange={(range, index) => {
    /* ... */
  }}
  onReorderRanges={newOrder => {
    /* ... */
  }}
/>
```
