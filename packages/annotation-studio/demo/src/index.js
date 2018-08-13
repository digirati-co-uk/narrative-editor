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

const ANNOTATION_VALUE_REGEXP = /(?:<h2 class="annotatedzoom-annotation-detail__label">([\s\S]*)<\/h2>[^<]*)(?:<div class="annotatedzoom-annotation-detail__content">([\s\S]*?)(?:<p class="annotatedzoom-annotation-detail__credit">([\s\S]*)<\/p>[^<]*)?<\/div>[^<]*)/;

const covertAnnotationToFields = annotation => {
  const targetParts = (typeof annotation.target === 'string'
    ? annotation.target
    : annotation.target.id
  ).split('#');
  const [target, hash] = targetParts;
  const hashParams = hash.split('&').reduce((acc, keyValue) => {
    let [key, value] = keyValue.split('=');
    acc[key] = value;
    return acc;
  }, {});
  let [x, y, width, height] = (hashParams.xywh || '0,0,100,100').split(',');
  let [all, title, description, credit] = annotation.body.value.match(
    ANNOTATION_VALUE_REGEXP
  ) || ['', '', '', ''];
  const draftProps = {
    id: annotation.id,
    target: target,
    input: {
      'https://annotation-studio.netlify.com/fields/describing/title': title,
      'https://annotation-studio.netlify.com/fields/describing/description': description,
      'https://annotation-studio.netlify.com/fields/describing/credits': credit,
    },
    selector: {
      type: 'madoc:boxdraw',
      name: null,
      x: ~~x,
      y: ~~y,
      width: ~~width,
      height: ~~height,
    },
  };
  return draftProps;
};

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
    TEST_MANIFEST.items[0].annotations[0].items.splice(index, 1);
    this.forceUpdate();
  };
  onUpdateAnnotation = (draft, index) => {
    const annotation = convertDraftToAnnotation(
      draft,
      draft.id,
      TEST_MANIFEST.items[0].id
    );
    TEST_MANIFEST.items[0].annotations[0].items[index] = annotation;
    this.forceUpdate();
  };
  onUpdateAnnotationOrder = newOrder => {
    console.log(newOrder);
  };
  previewRenderer = annotation => {
    let draft = covertAnnotationToFields(annotation);
    return draft.input[
      'https://annotation-studio.netlify.com/fields/describing/title'
    ];
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
          previewRenderer={this.previewRenderer}
          customDraftConverter={covertAnnotationToFields}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
