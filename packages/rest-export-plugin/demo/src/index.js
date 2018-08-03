import React, { Component } from 'react';
import { render } from 'react-dom';

import Example from '../../src';
import { default as demoManifest } from './demo.json';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>rest-export-plugin Demo</h1>
        <Example
          manifestJson={demoManifest}
          apiEndpoint="https://api.myjson.com/bins"
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
