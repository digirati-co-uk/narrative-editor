import { draftCreationHelper } from '@annotation-studio/plugin-core/es/core.utils';
import React, { Component } from 'react';
import { provider as Core } from '@annotation-studio/plugin-core';
import { provider as Viewer } from '@annotation-studio/plugin-viewer';
import { provider as ResourceEditor } from '@annotation-studio/plugin-resource-editor';
import { pluginKit } from '@annotation-studio/components';
import EditorLayout from '../EditorLayout/EditorLayout';
import { createAnnotationFromCaptureModelAndDraft } from '@annotation-studio/redux/es/lib/annotation/mapping';
import { getCurrentResource } from '@annotation-studio/redux/es/query/resourceQuery';

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
    // Raw JSON for capture model, instead of loading. IDs must still match.
    captureModelJson: null,
    // Raw JSON for manifest, instead of loading. IDs must still match.
    manifestJson: null,
  };

  state = {
    draft: null,
    storeLoaded: false,
  };

  componentWillMount() {
    this.importDraft(this.props);
  }

  componentDidMount() {
    pluginKit.registerPlugin('annotation-export-plugin', {
      PUBLISH_BUTTON: ({ draft }) => {
        return <button onClick={this.saveAnnotation(draft)}>Save</button>;
      },
    });
  }

  saveAnnotation = draft => () => {
    const annotation = this.makeAnnotation(draft);
    this.props.onCreateAnnotation({
      ...this.state,
      draft,
      annotation: {
        ...annotation,
        body: annotation.body ? annotation.body.toJSON() : null,
        target: annotation.target ? annotation.target.toJSON() : null,
      },
    });
  };

  makeAnnotation(currentDraft) {
    const { tree } = this.state;
    const { canvas } = this.props;
    return createAnnotationFromCaptureModelAndDraft({
      target: canvas,
      captureModel: getCurrentResource(tree, this.store.getState()),
      draft: currentDraft,
    });
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
    const tree = captureModelId || captureModel;
    const draft = draftCreationHelper({
      id: draftId,
      input,
      captureModel: id,
      tree,
    });
    this.setState({
      tree,
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
    const { manifest, canvas, captureModelJson, manifestJson } = this.props;

    return (
      <Core
        key={draftId}
        onLoadStore={this.loadStore}
        manifest={manifest}
        manifestJson={manifestJson}
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
                toggleable={false}
                showControls={true}
                selectedViewer="OpenSeadragonViewer"
                manifest={manifest}
                canvas={canvas}
              />
            </EditorLayout.Viewer>
            <EditorLayout.Properties>
              <ResourceEditor
                draftId={draftId}
                captureModelId={captureModelId}
                captureModelJson={captureModelJson}
                hideClose={true}
                plugins={['annotation-export-plugin']}
                store={store}
              />
            </EditorLayout.Properties>
          </EditorLayout>
        )}
      </Core>
    );
  }
}

export default AnnotationEditor;
