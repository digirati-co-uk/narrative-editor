import React, { Component } from 'react';

// Annotations studio requirements
import { createStore, reducers } from '@annotation-studio/redux';
// TODO: make it independent form the es version...
import {
  addManifest,
  selectCanvas,
  selectManifest,
} from '@annotation-studio/redux/es/actions/manifest';
import { pluginKit } from '@annotation-studio/components';
import { provider as CoreProvider } from '@annotation-studio/plugin-core';
import { provider as ViewerProvider } from '@annotation-studio/plugin-viewer';
import { provider as ResourceEditorProvider } from '@annotation-studio/plugin-resource-editor';
import { importResourceTemplate } from '@annotation-studio/bridge';
import { actions } from '@annotation-studio/redux';

import Editor from '../bem/Editor';

// TODO: make it as default state param or part of the presley.js
const DEFAULT_LOCALE = 'en';

export default class AnnotationStudioEditor extends Component {
  constructor(props) {
    super(props);
    let locale = props.locale || DEFAULT_LOCALE;
    this.manifest = props.manifestJson;
    this.canvas = props.manifestJson.items.filter(
      canvas => canvas.id === this.props.canvas
    )[0];
    this.store = createStore(reducers, [], locale);
    this.alterDefaultDraftSaveButton();
  }

  alterDefaultDraftSaveButton = () => {
    const self = this;
    pluginKit.registerPlugin('save-in-progress', {
      PUBLISH_BUTTON: pluginProps => {
        return (
          <button
            onClick={ev => {
              const state = self.store.getState();
              const draftId =
                state.drafts.currentDrafts[self.props.captureModel['@id']];
              const draft = state.drafts.list[draftId];
              self.store.dispatch(actions.drafts.discardCurrentDraft(draftId));
              pluginProps.onSaveAsInProgress(ev);
              console.log(self.store.getState());
              if (self.props.onCreateAnnotation) {
                self.props.onCreateAnnotation(draft);
              }
              // this.setState({
              //   isEditing: false,
              // });
            }}
            style={{
              float: 'right',
            }}
          >
            Save
          </button>
        );
      },
    });
  };

  render() {
    const { dispatch } = this.store;
    let annotationSudioStore = this.store;

    dispatch(importResourceTemplate(this.props.captureModel, 'canvas'));
    dispatch(actions.manifest.addManifest(this.manifest.id, this.manifest));
    dispatch(actions.manifest.selectManifest(this.manifest.id));
    dispatch(actions.manifest.selectCanvas(this.canvas.id));

    return (
      <Editor.Content>
        <CoreProvider
          store={annotationSudioStore}
          manifest={this.manifest}
          disableCloseWarning={true}
          canvas={this.canvas.id}
        />
        <Editor.Viewer>
          <ViewerProvider
            selectedViewer="OpenSeadragonViewer"
            image={{
              src: this.canvas.items[0].items[0].body.id,
              width: parseInt(this.canvas.width, 10),
              height: parseInt(this.canvas.height, 10),
            }}
            toggleable={false}
            showControls={true}
            store={annotationSudioStore}
          />
        </Editor.Viewer>
        <Editor.Properties>
          <ResourceEditorProvider
            store={annotationSudioStore}
            plugins={['save-in-progress']}
            target="canvas"
            tree={this.props.captureModel['@id']}
            manifest={this.manifest}
            //enablePublishing={true}
            enableEditing={true}
            enableLocalStorage={true}
            enableLocalStorageSaving={true}
            //disableConfirmation={true}
            enableIncomplete={false}
            canvas={this.canvas.id}
          />
        </Editor.Properties>
      </Editor.Content>
    );
  }
}
