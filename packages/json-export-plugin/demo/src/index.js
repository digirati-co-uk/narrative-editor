import React, { Component } from 'react';
import { render } from 'react-dom';
import ComponentDemo from 'react-component-demo';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { rainbow } from 'react-syntax-highlighter/styles/hljs';

import { JSONExport } from '../../src/index';

class Demo extends Component {
  render() {
    const editorStyles = {
      width: '48%',
      display: 'inline-block',
      verticalAlign: 'top',
    };
    return (
      <div>
        <h1>json-export-plugin Demo</h1>
        <section>
          <h2>Basic example</h2>
          <ComponentDemo
            Component={JSONExport}
            name="JSONExport"
            props={{
              manifestJson: {
                bool: true,
                number: 1,
                array: [],
                object: {},
              },
              showCopyToClipboard: true,
              copyButtonText: 'Copy to clipboard',
              title: 'Export Json',
              hideTitle: false,
            }}
            codeContainerStyle={editorStyles}
            componentContainerStyle={editorStyles}
          />
        </section>
        <section>
          <h2>Adding extra action buttons</h2>

          <SyntaxHighlighter language="jsx" style={rainbow}>{`
<JSONExport
  manifestJson={{
    bool: true,
    number: 1,
  }}
>
  <button>Action Button 1</button>
  <button>Action Button 2</button>
</JSONExport>
            `}</SyntaxHighlighter>
          <JSONExport
            manifestJson={{
              bool: true,
              number: 1,
            }}
          >
            <button>Action Button 1</button>
            <button>Action Button 2</button>
          </JSONExport>
        </section>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
