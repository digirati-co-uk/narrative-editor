# Annotation studio

A wrapper around the annotation studio for the narrative editor. Provides its own prop-interface
for editing annotations. It will use the 2 related plugins to extend functionality beyond
the vanilla annotation studio.

## Usage

```js
<AnnotationStudio
  manifestId=""
  manifestJson={{ /* ... */ }}
  canvas="http://.."
  onCreateAnnotation={(annotation, index) => (/* ... */)}
  onDeleteAnnotation={(annotation, index) => (/* ... */)}
  onUpdateAnnotation={(annotation, index) => (/* ... */)}
  onUpdateAnnotationOrder={newOrder => {/* ... */}}
/>
```

The annotation studio should be a controlled input. The manifestJson passed in will not be
re-evaluated unless the manifestId changes. Annotation studio component will update its own
internal state of the annotation lists. This might change if problems come up.

This will also include plugins for annotation studio:

- Import manifest
- Export manifest

They could be their own modules, or part of the same.
