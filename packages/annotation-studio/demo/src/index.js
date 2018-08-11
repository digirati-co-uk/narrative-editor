import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnnotationStudio } from '../../src';
import oceanLiners from './data/manifests/ocean-liners.json';
import captureModel from './data/capturemodels/describing.json';
import './demo.scss';

const TEST_MANIFEST = oceanLiners;

class Demo extends Component {
  onCreateAnnotation = (draft, index) => {
    // TDOO: do it wit as builtins
    const title =
      draft.input[
        'https://annotation-studio.netlify.com/fields/describing/title'
      ];
    const description =
      draft.input[
        'https://annotation-studio.netlify.com/fields/describing/description'
      ];
    const credit = '';
    const annotation = {
      id:
        TEST_MANIFEST.id.replace('/manifest.json', '') +
        '/annopage/p1/a' +
        index,
      type: 'Annotation',
      motivation: 'describing',
      body: {
        type: 'TextualBody',
        value: `
<h2 class=\"annotatedzoom-annotation-detail__label\">${title}</h2>
<div class=\"annotatedzoom-annotation-detail__content\">
  ${description}
  <p class=\"annotatedzoom-annotation-detail__credit\">${credit}</p>
</div>`,
        format: 'text/html',
      },
      target: {
        id: `https://iiif.vam.ac.uk/collections/O1023003/canvas/c0#xywh=${~~draft
          .selector.x},${~~draft.selector.y},${~~draft.selector.width},${~~draft
          .selector.height}`,
        type: 'Canvas',
      },
    };
    TEST_MANIFEST.items[0].annotations[0].items.push(annotation);
    this.forceUpdate();
  };
  onDeleteAnnotation = (annotation, index) => {
    console.log(annotation, index);
    TEST_MANIFEST.items[0].annotations[0].items.splice(index, 1);
    this.forceUpdate();
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
