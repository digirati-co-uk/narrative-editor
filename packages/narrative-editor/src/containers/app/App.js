import './App.scss';

import React from 'react';
import { ImportScreen } from '../../components';
import { AnnotationStudio } from '@narrative-editor/annotation-studio';

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

  createNewManifestFromImage = iiifImageJson => {
    return {
      label: {
        en: ['Unnamed manifest'],
      },
      type: 'Manifest',
      id: '${this.TEMPORARY_MANIFEST_URI}/manifest',
      items: [
        {
          label: {
            en: ['Canvas 1'],
          },
          height: iiifImageJson.height,
          width: iiifImageJson.width,
          type: 'Canvas',
          id: '${this.TEMPORARY_MANIFEST_URI}/canvas/c1',
          items: [
            {
              type: 'AnnotationPage',
              items: [
                {
                  id: '${this.TEMPORARY_MANIFEST_URI}/annot/c1-1',
                  type: 'Annotation',
                  motivation: 'painting',
                  label: {
                    en: ['Image Annotation 1'],
                  },
                  body: {
                    id: iiifImageJson['@id'] + '/full/!400,400/0/default.jpg',
                    type: 'Image',
                    format: 'image/jpg',
                    service: [
                      {
                        id: iiifImageJson['@id'],
                        type: 'ImageService3',
                        profile: 'level2',
                      },
                    ],
                    height: iiifImageJson.height,
                    width: iiifImageJson.width,
                  },
                  target: '${this.TEMPORARY_MANIFEST_URI}/canvas/c1',
                },
              ],
              id: '${this.TEMPORARY_MANIFEST_URI}/list/c1-ap1',
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

  render() {
    return this.state.manifestJson ? (
      <AnnotationStudio manifestJson={this.state.manifestJson} />
    ) : (
      <ImportScreen onImageSelectedCallback={this.newImageReceived} />
    );
  }
}

export default App;
