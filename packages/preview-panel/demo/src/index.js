import React, { Component } from 'react';
import { render } from 'react-dom';
import { default as demoManifest } from './demo.json';

import PreviewPanel from '../../src';
import './index.css';

class Demo extends Component {
  render() {
    return (
      <div className="demo-container">
        <h1>preview-panel Demo</h1>
        <PreviewPanel manifestJson={demoManifest} experience="fullpage">
          <button>Save</button>
          <button>Preview In a new window</button>
        </PreviewPanel>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
