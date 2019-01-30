import './App.scss';

import React from 'react';
import { ImportScreen } from '../../components';
import { AnnotationStudio } from '@narrative-editor/annotation-studio';
import captureModel from '../../data/capturemodels/describing.json';
import { convertDraftToAnnotation, covertAnnotationToFields } from './helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manifestJson: null,
    };
    this.TEMPORARY_MANIFEST_URI =
      props.temporaryManifestUri || `http://digirati.com/iiif/v3/temporary`;
  }

  newImageReceived = iiifImageJson => {
    this.setState({
      manifestJson: this.createNewManifestFromImage(iiifImageJson),
    });
  };
  // presyalely.js
  createNewManifestFromImage = iiifImageJson => {
    const imageId =
      iiifImageJson.service['@id'] || iiifImageJson.service['@id'];
    return {
      label: {
        en: ['Unnamed manifest'],
      },
      type: 'Manifest',
      id: `${this.TEMPORARY_MANIFEST_URI}/manifest`,
      items: [
        {
          label: {
            en: ['Canvas 1'],
          },
          height: iiifImageJson.height,
          width: iiifImageJson.width,
          type: 'Canvas',
          id: `${this.TEMPORARY_MANIFEST_URI}/canvas/c1`,
          items: [
            {
              type: 'AnnotationPage',
              items: [
                {
                  id: `${this.TEMPORARY_MANIFEST_URI}/annot/c1-1`,
                  type: 'Annotation',
                  motivation: 'painting',
                  label: {
                    en: ['Image Annotation 1'],
                  },
                  body: {
                    id: `${imageId}/full/!400,400/0/default.jpg`,
                    type: 'Image',
                    format: 'image/jpg',
                    service: [
                      {
                        id: imageId,
                        type: 'ImageService3',
                        profile: 'level2',
                      },
                    ],
                    height: iiifImageJson.height,
                    width: iiifImageJson.width,
                  },
                  target: `${this.TEMPORARY_MANIFEST_URI}/canvas/c1`,
                },
              ],
              id: `${this.TEMPORARY_MANIFEST_URI}/list/c1-ap1`,
            },
          ],
          annotations: [
            {
              type: 'AnnotationPage',
              id: `${this.TEMPORARY_MANIFEST_URI}/annopage/p1`,
              items: [],
            },
          ],
        },
      ],
      '@context': [
        'http://www.w3.org/ns/anno.jsonld',
        'http://iiif.io/api/presentation/3/context.json',
      ],
    };
  };

  onCreateAnnotation = (draft, index) => {
    const annotation = convertDraftToAnnotation(
      draft,
      this.state.manifestJson.items[0].annotations[0].id + '/' + index,
      this.state.manifestJson.items[0].id
    );
    this.state.manifestJson.items[0].annotations[0].items.push(annotation);
    this.forceUpdate();
  };
  onDeleteAnnotation = (annotation, index) => {
    this.state.manifestJson.items[0].annotations[0].items.splice(index, 1);
    this.forceUpdate();
  };
  onUpdateAnnotation = (draft, index) => {
    const annotation = convertDraftToAnnotation(
      draft,
      draft.id,
      this.state.manifestJson.items[0].id
    );
    this.state.manifestJson.items[0].annotations[0].items[index] = annotation;
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

  // end presley.js

  render() {
    return this.state.manifestJson ? (
      <div className="screen start-screen">
        <h1 className="screen__title">Narrative Editor</h1>
        <div className="screen__content">
          <AnnotationStudio
            manifestId={this.TEMPORARY_MANIFEST_URI + '/manifest'}
            manifestJson={this.state.manifestJson}
            canvas={`${this.TEMPORARY_MANIFEST_URI}/canvas/c1`}
            captureModel={captureModel}
            onCreateAnnotation={this.onCreateAnnotation}
            onDeleteAnnotation={this.onDeleteAnnotation}
            onUpdateAnnotation={this.onUpdateAnnotation}
            onUpdateAnnotationOrder={this.onUpdateAnnotationOrder}
            previewRenderer={this.previewRenderer}
            customDraftConverter={covertAnnotationToFields}
          />
        </div>
      </div>
    ) : (
      <ImportScreen onImageSelectedCallback={this.newImageReceived} />
    );
  }
}

export default App;
