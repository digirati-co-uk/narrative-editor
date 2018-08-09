import React, { Component } from 'react';

import localstorage from 'store';
import { createStore, reducers } from '@annotation-studio/redux';
import {
  addManifest,
  selectCanvas,
  selectManifest,
} from '@annotation-studio/redux/es/actions/manifest';
import { pluginKit } from '@annotation-studio/components';
import ComboButton from '@annotation-studio/components/es/components/inputs/ComboButton';
import { provider as CoreProvider } from '@annotation-studio/plugin-core';
import { provider as ViewerProvider } from '@annotation-studio/plugin-viewer';
import { provider as DraftsProvider } from '@annotation-studio/plugin-drafts';
import { provider as ResourceEditorProvider } from '@annotation-studio/plugin-resource-editor';
import { importResourceTemplate } from '@annotation-studio/bridge';
import { getResourceById } from '@annotation-studio/redux/es/query/resourceQuery';
import { utils } from '@annotation-studio/plugin-core';
import { default as resourceTemplate } from './describing-outer.json';
import bem from '@fesk/react-bem';
import './AnnotationStudio.scss';

const DEFAULT_LOCALE = 'en';

const Editor = bem('editor', editor => ({
  Main: editor,
  Content: editor.element('content'),
  Viewer: editor.element('viewer'),
  Properties: editor.element('properties'),
}));

export default class AnnotationStudio extends Component {
  constructor(props) {
    super(props);
    let locale = locale || DEFAULT_LOCALE;
    this.manifest = props.manifestJson;
    this.canvas = props.manifestJson.items.filter(
      canvas => canvas.id === this.props.canvas
    )[0];

    this.savedDraftList =
      localstorage.get(`annotation-studio/${window.location.href}`) || {};
    this.disableCloseWarningBoolean = true;
    this.store = createStore(reducers, [], locale);
    pluginKit.registerPlugin('save-in-progress', {
      PUBLISH_BUTTON: pluginProps => {
        return (
          <ComboButton onClick={pluginProps.onSaveAsInProgress}>
            Save
          </ComboButton>
        );
      },
    });
  }

  render() {
    const { dispatch } = this.store;
    let store = this.store;
    let resourceTemplates =
      'https://nlw-omeka.digtest.co.uk/s/site-one/annotation-studio/open/resource/3898';
    dispatch(importResourceTemplate(resourceTemplate, 'canvas'));
    dispatch(addManifest(this.manifest.id, this.manifest));
    dispatch(selectManifest(this.manifest.id));
    dispatch(selectCanvas(this.canvas.id));

    const resourceCache = {};
    //resource[resourceTemplates] = resource;
    const importCaptureModel = allResourceTemplates => {
      let _resourceTemplate = getResourceById(
        store.getState(),
        allResourceTemplates
      );
      if (_resourceTemplate) {
        return _resourceTemplate;
      }

      if (!resourceCache[resourceTemplates]) {
        resourceCache[resourceTemplates] = utils
          .fetchResourceTemplate(resourceTemplates)
          .then(r => r.json())
          .then(singleResourceTemplate => {
            dispatch(importResourceTemplate(singleResourceTemplate, target));

            const resource = getResourceById(
              store.getState(),
              resourceTemplates
            );
            if (resource) {
              return resource;
            }

            return { id: singleResourceTemplate['@id'] };
          });
      }

      return resourceCache[resourceTemplates];
    };

    return (
      <Editor>
        <CoreProvider
          store={this.store}
          manifest={this.manifest}
          disableCloseWarning={this.disableCloseWarningBoolean}
          savedDraftList={this.savedDraftList}
          //elucidateServer={'http://localhost:4242/annotation/w3c/'}
          canvas={this.canvas.id}
        />
        <Editor.Content>
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
              store={this.store}
            />
          </Editor.Viewer>
          <Editor.Properties>
            <ResourceEditorProvider
              store={this.store}
              plugins={['save-in-progress']}
              target="canvas"
              tree={'/capture-models/generic/describing-outer.json'}
              manifest={this.manifest}
              //enablePublishing={true}
              //enableEditing={true}
              enableLocalStorage={true}
              enableLocalStorageSaving={true}
              //disableConfirmation={true}
              createAnnotation={(a, b, c) => {
                console.log(a, b, c);
              }}
              updateAnnotation={(a, b, c) => {
                console.log(a, b, c);
              }}
              // onSave={(a, b, c) => {
              //   console.log(a, b, c);
              // }}
              // onSaveAsIncomplete={(magic, b, c) => {
              //   console.log(magic, b, c);
              // }}
              // createAnnotation={annotation => {
              //   console.log('createAnnotation', annotation);
              //   return annotation;
              // }}
              // updateAnnotation={(annotation)=>{
              //   console.log('updateAnnotation', annotation);
              //   return annotation;
              // }}
              // deleteAnnotation={(annotation)=>{
              //   console.log('deleteAnnotation', annotation);
              //   return annotation;
              // }}
              enableIncomplete={false}
              //importCaptureModel={importCaptureModel}
              canvas={this.canvas.id}
            />
            <DraftsProvider
              store={this.store}
              plugins={[]}
              label="All annotations"
              filterBy="localStorage"
              emptyState={false}
              hideIfEmpty={false}
              thumbnailSize={150}
              showThumbnail={true}
              description=""
            />
          </Editor.Properties>
        </Editor.Content>
      </Editor>
    );
  }
}
