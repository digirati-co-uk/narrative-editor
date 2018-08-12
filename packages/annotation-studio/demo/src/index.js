import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnnotationStudio } from '../../src';
import oceanLiners from './data/manifests/ocean-liners.json';
import captureModel from './data/capturemodels/describing.json';
import './demo.scss';

const TEST_MANIFEST = oceanLiners;

const convertDraftToAnnotation = (draft, id, canvasId) => {
  const title =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/title'
    ] || '';
  const description =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/description'
    ] || '';
  const credit =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/credits'
    ] || '';
  const { x, y, width, height } = draft.selector;
  const annotation = {
    id: id,
    type: 'Annotation',
    motivation: 'describing',
    body: {
      type: 'TextualBody',
      value: `<h2 class="annotatedzoom-annotation-detail__label">${title}</h2>
<div class="annotatedzoom-annotation-detail__content">
${description}
<p class="annotatedzoom-annotation-detail__credit">${credit}</p>
</div>`,
      format: 'text/html',
    },
    target: {
      id: `${canvasId}#xywh=${~~x},${~~y},${~~width},${~~height}`,
      type: 'Canvas',
    },
  };
  return annotation;
};

// const covertAnnotationToFields = (annotation) => {
//   const draftProps = {
//     input: annotation
//   }
// };

class Demo extends Component {
  onCreateAnnotation = (draft, index) => {
    const annotation = convertDraftToAnnotation(
      draft,
      TEST_MANIFEST.items[0].annotations[0].id + '/' + index,
      TEST_MANIFEST.items[0].id
    );
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
