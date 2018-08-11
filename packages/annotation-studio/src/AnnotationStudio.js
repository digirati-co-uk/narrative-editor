import React, { Component } from 'react';

// Annotations studio requirements
import localstorage from 'store';
import { createStore, reducers } from '@annotation-studio/redux';
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
import { getResourceById } from '@annotation-studio/redux/es/query/resourceQuery';
import { utils } from '@annotation-studio/plugin-core';
import { default as resourceTemplate } from './describing.json';
// Other components used for the standalone experience
import CanvasPanelPreview from './CanvasPanelPreview';
import { AnnotationList } from './AnnotationList';
// Annotation studio component requirements
import bem from '@fesk/react-bem';
import './AnnotationStudio.scss';

// TODO: make it as default state param or part of the presley.js
const DEFAULT_LOCALE = 'en';

const Editor = bem('annotation-studio-editor', editor => ({
  Main: editor,
  Content: editor.element('content'),
  Viewer: editor.element('viewer'),
  Properties: editor.element('properties'),
}));

// These should be in a separate package as fesk-react-layout-helpers or such
// And when we start a new project we shouldn't need to create these over and over again.
const FullHeightPanel = bem('full-height-panel', fullHeightPanel => ({
  Main: fullHeightPanel,
  Content: fullHeightPanel.element('content'),
  ButtonBar: fullHeightPanel.element('button-bar'),
}));

export default class AnnotationStudio extends Component {
  constructor(props) {
    super(props);
    let locale = locale || DEFAULT_LOCALE;
    this.manifest = props.manifestJson;
    this.canvas = props.manifestJson.items.filter(
      canvas => canvas.id === this.props.canvas
    )[0];
    this.state = { isEditing: false };

    // the problem is that this is hard wired to annotation studio...
    // TODO: remove this because we only edit one at a time.
    this.savedDraftList =
      localstorage.get(`annotation-studio/${window.location.href}`) || {};

    this.store = createStore(reducers, [], locale);
  }

  alterDefaultDraftSaveButton = () => {
    pluginKit.registerPlugin('save-in-progress', {
      PUBLISH_BUTTON: pluginProps => {
        return (
          <button
            onClick={ev => {
              pluginProps.onSaveAsInProgress(ev);
              this.setState({
                isEditing: false,
              });
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
          disableCloseWarning={true}
          savedDraftList={this.savedDraftList}
          canvas={this.canvas.id}
        />
        <Editor.Content>
          <Editor.Viewer>
            {this.state.isEditing === true ? (
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
            ) : (
              <CanvasPanelPreview
                manifest={this.manifest}
                canvas={this.canvas}
              />
            )}
          </Editor.Viewer>
          <Editor.Properties>
            {this.state.isEditing ? (
              <ResourceEditorProvider
                store={this.store}
                plugins={['save-in-progress']}
                target="canvas"
                tree={'/capture-models/generic/describing.json'}
                manifest={this.manifest}
                //enablePublishing={true}
                enableEditing={true}
                enableLocalStorage={true}
                enableLocalStorageSaving={true}
                //disableConfirmation={true}
                enableIncomplete={false}
                canvas={this.canvas.id}
              />
            ) : (
              <FullHeightPanel>
                <FullHeightPanel.Content>
                  <AnnotationList annotationList={this.canvas.annotations[0]} />
                </FullHeightPanel.Content>
                <FullHeightPanel.ButtonBar>
                  <button
                    onClick={() => {
                      this.setState({
                        isEditing: true,
                      });
                    }}
                  >
                    Add New
                  </button>
                </FullHeightPanel.ButtonBar>
              </FullHeightPanel>
            )}
          </Editor.Properties>
        </Editor.Content>
      </Editor>
    );
  }
}
