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

import { getDraftFromCaptureModel } from '@annotation-studio/bridge';
import { getResourceById } from '@annotation-studio/redux/es/query/resourceQuery';

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
              const {
                captureModel,
                onUpdateAnnotation,
                onCreateAnnotation,
                annotation,
              } = self.props;
              const state = self.store.getState();
              const draftId = state.drafts.currentDrafts[captureModel['@id']];
              const draft = state.drafts.list[draftId];
              self.store.dispatch(
                actions.drafts.removeSelectorFromCurrentDraft(draft.template)
              );
              self.store.dispatch(actions.drafts.discardCurrentDraft());
              if (annotation && onUpdateAnnotation) {
                onUpdateAnnotation(draft);
              } else if (onCreateAnnotation) {
                onCreateAnnotation(draft);
              }
              //pluginProps.onSaveAsInProgress(ev);
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

  createDraft = (resourceTemplateId, inputs, id, selector) => {
    const { dispatch } = this.store;
    const state = this.store.getState();
    const { resources, motivation, selectors } = getDraftFromCaptureModel(
      getResourceById(state, resourceTemplateId)
    );
    const draftDefaults = {};
    const scope = resourceTemplateId;
    const input = Object.assign({}, inputs);
    dispatch(actions.drafts.discardCurrentDraft());
    dispatch(
      actions.drafts.importDraft(id, {
        id,
        input: input,
        selectors: selectors,
        template: resourceTemplateId,
        motivation: motivation,
        isPublishing: false,
        isPreviewing: false,
        selector: { ...selector, type: 'madoc:boxdraw', name: null },
      })
    );
    // And select it straight away.
    dispatch(actions.drafts.selectDraft(scope, id));
  };

  render() {
    const { dispatch } = this.store;
    let annotationSudioStore = this.store;

    dispatch(importResourceTemplate(this.props.captureModel, 'canvas'));
    dispatch(actions.drafts.discardCurrentDraft());
    dispatch(actions.manifest.addManifest(this.manifest.id, this.manifest));
    dispatch(actions.manifest.selectManifest(this.manifest.id));
    dispatch(actions.manifest.selectCanvas(this.canvas.id));
    if (this.props.annotation) {
      if (this.props.customDraftConverter) {
        let draftFields = this.props.customDraftConverter(
          this.props.annotation
        );
        this.createDraft(
          this.props.captureModel['@id'],
          draftFields.input,
          draftFields.id,
          draftFields.selector
        );
      }
    }
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
