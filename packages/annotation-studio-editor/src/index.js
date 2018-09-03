import React from 'react';
import './main.scss';
import { render } from 'react-dom';
import { provider as Core } from '@annotation-studio/plugin-core';
import { provider as Viewer } from '@annotation-studio/plugin-viewer';
import { provider as ResourceEditor } from '@annotation-studio/plugin-resource-editor';
import { provider as JsonPreview } from '@annotation-studio/plugin-json-preview';
import { provider as Drafts } from '@annotation-studio/plugin-drafts';

const draftToLoad = {
  id: '5087871e-4864-4eef-a21c-3e2fca885bc3',
  input: {
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/75':
      'test',
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/74': null,
  },
  selectors: {
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/75': {
      type: null,
    },
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/74': {
      type: null,
    },
  },
  template:
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76',
  motivation: {
    id: 'oa:describing',
    label: 'describing',
    instance: 'describing',
  },
  isPublishing: false,
  isPreviewing: true,
  selector: {
    type: 'WholeCanvasSelector',
    source: {
      template:
        'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76',
      scope:
        'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77',
      draft: '5087871e-4864-4eef-a21c-3e2fca885bc3',
    },
    name: null,
  },
  fingerprint: {
    scope:
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77',
    path: [
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76',
    ],
    created: '2018-09-03T21:00:21.255Z',
    lifecycle: 'DRAFT_LIFECYCLE_CHANGED',
    source: 'memory',
    creator: 'you',
    partOf: null,
  },
};

class App extends React.Component {
  state = {
    storeLoaded: false,
  };

  loadStore = store => {
    this.store = store;
    this.setState({ storeLoaded: true });
  };

  render() {
    const { manifest, canvas, captureModelId } = this.props;
    const { storeLoaded } = this.state;
    return (
      <div>
        <Core
          onLoadStore={this.loadStore}
          manifest={manifest}
          canvas={canvas}
          target="canvas"
          elucidateServer="http://localhost/"
          savedDraftList={[[draftToLoad]]}
        />
        {storeLoaded ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              paddingRight: 450,
              position: 'relative',
            }}
          >
            <div>
              <Viewer
                store={this.store}
                selectedViewer="OpenSeadragonViewer"
                manifest={manifest}
                canvas={canvas}
                image={{
                  src: 'https://deriv.nls.uk/dcn4/7443/74438561.4.jpg',
                  height: 1868,
                  width: 2500,
                }}
              />
            </div>
            <div style={{ position: 'absolute', right: 0, width: 450, top: 0 }}>
              <ResourceEditor
                captureModelId={captureModelId}
                plugins={['json-preview-plugin']}
                store={this.store}
              />
              <JsonPreview store={this.store} />
              <Drafts
                filterBy="elucidate,localStorage,memory"
                store={this.store}
              />
            </div>
          </div>
        ) : (
          'loading...'
        )}
      </div>
    );
  }
}

render(
  <App
    manifest="https://view.nls.uk/manifest/7446/74464117/manifest.json"
    canvas="https://view.nls.uk/iiif/7446/74464117/canvas/1"
    captureModelId="https://stephenwf.github.io/77.json"
  />,
  document.getElementById('app')
);
