import React from 'react';
import './main.scss';
import { render } from 'react-dom';
import { provider as Core } from '@annotation-studio/plugin-core';
import { provider as Viewer } from '@annotation-studio/plugin-viewer';
import { provider as ResourceEditor } from '@annotation-studio/plugin-resource-editor';
import { provider as JsonPreview } from '@annotation-studio/plugin-json-preview';
import { draftCreationHelper } from '@annotation-studio/plugin-core/es/core.utils';
import AnnotationEditor from './components/AnnotationEditor/AnnotationEditor';
import EditorLayout from './components/EditorLayout/EditorLayout';

const domain = 'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100';
const draft = draftCreationHelper({
  input: {
    [domain + '/api/items/75']: 'testing this works.',
    [domain + '/api/items/74']: null,
  },
  captureModel: domain + '/api/item_sets/76',
  tree: domain + '/api/item_sets/77',
});
const draftId = Object.keys(draft[domain + '/api/item_sets/76'])[0];

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
      <div className="annotation-studio-editor">
        <Core
          onLoadStore={this.loadStore}
          manifest={manifest}
          canvas={canvas}
          target="canvas"
          savedDraftList={draft}
        />
        {storeLoaded ? (
          <EditorLayout>
            <EditorLayout.Viewer>
              <Viewer
                store={this.store}
                fullHeight={true}
                selectedViewer="OpenSeadragonViewer"
                manifest={manifest}
                canvas={canvas}
              />
            </EditorLayout.Viewer>
            <EditorLayout.Properties>
              <ResourceEditor
                draftId={draftId}
                captureModelId={captureModelId}
                plugins={['json-preview-plugin']}
                store={this.store}
              />
              <JsonPreview store={this.store} />
            </EditorLayout.Properties>
          </EditorLayout>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

render(
  <AnnotationEditor
    manifest="https://view.nls.uk/manifest/7446/74464117/manifest.json"
    canvas="https://view.nls.uk/iiif/7446/74464117/canvas/1"
    captureModel="https://stephenwf.github.io/77.json"
    input={{
      [domain + '/api/items/75']: 'testing this works.',
      [domain + '/api/items/74']: null,
    }}
    nestedCaptureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76"
    captureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77"
  />,
  document.getElementById('app')
);
