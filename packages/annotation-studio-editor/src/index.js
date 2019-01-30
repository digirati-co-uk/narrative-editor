import React from 'react';
import './main.scss';
import { render } from 'react-dom';
import AnnotationEditor from './components/AnnotationEditor/AnnotationEditor';

render(
  <AnnotationEditor
    manifest="https://view.nls.uk/manifest/7446/74464117/manifest.json"
    canvas="https://view.nls.uk/iiif/7446/74464117/canvas/1"
    captureModel="https://stephenwf.github.io/77.json"
    input={{
      ['http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/75']:
        'testing this works.',
      ['http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/74']: null,
    }}
    onCreateAnnotation={annotation => {
      console.log(annotation);
    }}
    nestedCaptureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76"
    captureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77"
  />,
  document.getElementById('app')
);
