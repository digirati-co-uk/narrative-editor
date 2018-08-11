import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnnotationStudio } from '../../src';
import oceanLiners from './data/manifests/ocean-liners.json';
import captureModel from './data/capturemodels/describing.json';
import './demo.scss';

const TEST_MANIFEST = oceanLiners;

class Demo extends Component {
  onCreateAnnotation = (annotation, index) => {
    console.log(annotation, index);
  };
  onDeleteAnnotation = (annotation, index) => {
    console.log(annotation, index);
  };
  onUpdateAnnotation = (annotation, index) => {
    console.log(annotation, index);
  };
  onUpdateAnnotationOrder = newOrder => {
    console.log(newOrder);
  };
  render() {
    return (
      <div>
        <h1>annotation-studio Demo</h1>
        <AnnotationStudio
          manifestId={TEST_MANIFEST.id}
          manifestJson={TEST_MANIFEST}
          canvas={TEST_MANIFEST.items[0].id}
          captureModel={captureModel}
          onCreateAnnotation={this.onCreateAnnotation}
          onDeleteAnnotation={this.onDeleteAnnotation}
          onUpdateAnnotation={this.onUpdateAnnotation}
          onUpdateAnnotationOrder={this.onUpdateAnnotationOrder}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
