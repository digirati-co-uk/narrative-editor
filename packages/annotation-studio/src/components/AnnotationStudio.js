import React, { Component } from 'react';

import AnnotationStudioEditor from './AnnotationStudioEditor';
// Other components used for the standalone experience
import CanvasPanelPreview from './CanvasPanelPreview';
import { AnnotationList } from './AnnotationList';
// Annotation studio component requirements
import Editor from '../bem/Editor';
import FullHeightPanel from '../bem/FullHeightPanel';

// TODO: make it as default state param or part of the presley.js
const DEFAULT_LOCALE = 'en';

export default class AnnotationStudio extends Component {
  constructor(props) {
    super(props);
    this.locale = props.locale || DEFAULT_LOCALE;
    this.manifest = props.manifestJson;
    this.canvas = props.manifestJson.items.filter(
      canvas => canvas.id === this.props.canvas
    )[0];
    this.state = {
      isEditing: false,
      selectedAnnotation: null,
    };
  }

  onCreateAnnotation = annotation => {
    console.log(annotation);
    this.setState({
      isEditing: false,
    });
    if (this.props.onCreateAnnotation) {
      this.props.onCreateAnnotation(
        annotation,
        this.canvas.items[0].items.length
      );
    }
  };
  onDeleteAnnotation = (annotation, index) => {
    console.log(annotation, index);
    if (this.props.onDeleteAnnotation) {
      this.props.onDeleteAnnotation(annotation, index);
    } else {
      //TODO: we don't want this.
      this.canvas.annotations[0].items.splice(foundAt, 1);
    }
  };
  onUpdateAnnotation = annotation => {
    console.log(annotation);
    this.setState({
      isEditing: false,
    });
    if (this.props.onUpdateAnnotation) {
      this.props.onUpdateAnnotation(annotation, index);
    }
  };
  onUpdateAnnotationOrder = newOrder => {
    console.log(newOrder);
    if (this.props.onUpdateAnnotationOrder) {
      this.props.onUpdateAnnotationOrder(annotation, index);
    }
  };

  onSelectAnnotation = annotation => {
    this.setState({
      selectedAnnotation: annotation,
    });
  };

  render() {
    return (
      <Editor>
        {this.state.isEditing ? (
          <AnnotationStudioEditor
            manifestJson={this.manifest}
            canvas={this.canvas.id}
            captureModel={this.props.captureModel}
            onCreateAnnotation={this.onCreateAnnotation}
            onDeleteAnnotation={this.onDeleteAnnotation}
            onUpdateAnnotation={this.onUpdateAnnotation}
            onUpdateAnnotationOrder={this.onUpdateAnnotationOrder}
            locale={this.locale}
          />
        ) : (
          <Editor.Content>
            <Editor.Viewer>
              <CanvasPanelPreview
                manifest={this.manifest}
                canvas={this.canvas}
                selectedAnnotation={this.state.selectedAnnotation}
                onSelectAnnotation={this.onSelectAnnotation}
              />
            </Editor.Viewer>
            <Editor.Properties>
              <FullHeightPanel>
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
                <FullHeightPanel.Content>
                  <AnnotationList
                    selectedAnnotation={this.state.selectedAnnotation}
                    annotationList={this.canvas.annotations[0]}
                    onDeleteCallback={this.onDeleteAnnotation}
                    onSelectCallback={this.onSelectAnnotation}
                  />
                </FullHeightPanel.Content>
              </FullHeightPanel>
            </Editor.Properties>
          </Editor.Content>
        )}
      </Editor>
    );
  }
}
