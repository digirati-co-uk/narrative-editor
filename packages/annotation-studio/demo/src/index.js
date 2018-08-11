import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnnotationStudio } from '../../src';
import oceanLiners from './data/ocean-liners.json';
import './demo.scss';

const TEST_MANIFEST = oceanLiners;

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>annotation-studio Demo</h1>
        <AnnotationStudio
          manifestId={TEST_MANIFEST.id}
          manifestJson={TEST_MANIFEST}
          canvas={TEST_MANIFEST.items[0].id}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
