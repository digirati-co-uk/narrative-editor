# Narrative Editor

Library of React components for editing IIIF resources for building up narrative experiences.

## Packages

- [Narrative Editor](./packages/narrative-editor) - root project using all other components
  - [PresleyJS](./packages/presley) - In-memory manifest management
  - [Annotation studio](./packages/annotation-studio) - Editing annotations
  - [Metadata Editor](./packages/metadata-editor) - Editing interface for Manifest, Canvas and Range metadata
  - [Range editor](./packages/range-editor) - Editing interface for Range metadata
  - [Preview Panel](./packages/preview-panel) - Canvas panel powered preview panel for narratives
  - [REST Export](./packages/rest-export-plugin) - Exports from the narrative editor to REST endpoint
  - [JSON Export](./packages/annotation-studio) - Exports from the narrative editor to JSON that can be copied

## Structure

![Narrative editor](editor.png 'Narrative editor structure.')

```
Copyright 2017 Digirati Limited

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
