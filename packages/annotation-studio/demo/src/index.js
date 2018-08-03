import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnnotationStudio } from '../../src';

const TEST_MANIFEST = {
  '@context': 'http://iiif.io/api/presentation/2/context.json',
  '@id': 'http://iiif.io/api/presentation/2.1/example/fixtures/1/manifest.json',
  '@type': 'sc:Manifest',
  label: 'Test 1 Manifest: Minimum Required Fields',
  within:
    'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
  sequences: [
    {
      '@type': 'sc:Sequence',
      canvases: [
        {
          '@id':
            'http://iiif.io/api/presentation/2.1/example/fixtures/canvas/1/c1.json',
          '@type': 'sc:Canvas',
          label: 'Test 1 Canvas: 1',
          height: 1800,
          width: 1200,
          images: [
            {
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id':
                  'https://dlc.services/iiif-img/rs/2/MS_626_008/full/!2000,2000/0/default.jpg',
                '@type': 'dctypes:Image',
                height: 5845,
                service: {
                  '@id': 'https://dlc.services/iiif-img/rs/2/MS_626_008',
                  height: 5845,
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image',
                  width: 6197,
                },
                width: 6197,
              },
              on:
                'http://iiif.io/api/presentation/2.1/example/fixtures/canvas/1/c1.json',
            },
          ],
        },
      ],
    },
  ],
};

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>annotation-studio Demo</h1>
        <AnnotationStudio
          manifestId={TEST_MANIFEST['@id']}
          manifestJson={TEST_MANIFEST}
          canvas={TEST_MANIFEST.sequences[0].canvases[0]['@id']}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
