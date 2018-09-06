import { draftCreationHelper } from '@annotation-studio/plugin-core/es/core.utils';
import React, { Component } from 'react';
import { provider as Core } from '@annotation-studio/plugin-core';
import { provider as Viewer } from '@annotation-studio/plugin-viewer';
import { provider as ResourceEditor } from '@annotation-studio/plugin-resource-editor';
import { provider as JsonPreview } from '@annotation-studio/plugin-json-preview';
import EditorLayout from '../EditorLayout/EditorLayout';

class AnnotationEditor extends Component {
  static defaultProps = {
    // Draft ID, if it exists (like editing).
    draftId: null,
    // Draft input.
    input: {},
    // Capture model to load
    captureModel: null,
    // Manifest ID
    manifest: null,
    // Canvas ID
    canvas: null,
    // callback
    onCreateAnnotation: () => {},

    // ** Optional props **
    // Capture model ID, if different
    captureModelId: null,
    // Nested capture model ID, if its a choice.
    nestedCaptureModelId: null,
  };

  state = {
    draft: null,
    storeLoaded: false,
  };

  componentWillMount() {
    this.importDraft(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.input !== this.props.input ||
      nextProps.draftId !== this.props.draftId ||
      nextProps.nestedCaptureModelId !== this.props.nestedCaptureModelId ||
      nextProps.captureModelId !== this.props.captureModelId ||
      nextProps.captureModel !== this.props.captureModel
    ) {
      this.importDraft(nextProps);
    }
  }

  importDraft({
    draftId,
    input,
    nestedCaptureModelId,
    captureModelId,
    captureModel,
  }) {
    const id = nestedCaptureModelId || captureModelId || captureModel;
    const draft = draftCreationHelper({
      id: draftId,
      input,
      captureModel: id,
      tree: captureModelId || captureModel,
    });
    this.setState({
      captureModelId: captureModel,
      draftId: draftId || Object.keys(draft[id])[0],
      draft,
    });
  }

  loadStore = store => {
    this.store = store;
    this.setState({ storeLoaded: true });
  };

  render() {
    const { draft, draftId, captureModelId } = this.state;
    const { manifest, canvas } = this.props;

    return (
      <Core
        onLoadStore={this.loadStore}
        manifest={manifest}
        canvas={canvas}
        target="canvas"
        savedDraftList={draft}
      >
        {({ store }) => (
          <EditorLayout>
            <EditorLayout.Viewer>
              <Viewer
                store={store}
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
                store={store}
              />
              <JsonPreview store={store} />
            </EditorLayout.Properties>
          </EditorLayout>
        )}
      </Core>
    );
  }
}

export default AnnotationEditor;
