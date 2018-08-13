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
      annotationToEdit: null,
    };
  }

  onCreateAnnotation = draft => {
    if (this.props.onCreateAnnotation) {
      this.props.onCreateAnnotation(
        draft,
        this.canvas.annotations[0].items.length + 1
      );
    }
    this.setState({
      isEditing: false,
    });
  };

  onDeleteAnnotation = (annotation, index) => {
    if (this.props.onDeleteAnnotation) {
      this.props.onDeleteAnnotation(annotation, index);
    } else {
      //TODO: we don't want this.
      this.canvas.annotations[0].items.splice(index, 1);
    }
  };

  onUpdateAnnotation = annotation => {
    this.setState({
      isEditing: false,
    });
    if (this.props.onUpdateAnnotation) {
      const index = this.canvas.annotations[0].items
        .map(item => item.id)
        .indexOf(annotation.id);
      this.props.onUpdateAnnotation(annotation, index);
    }
  };

  onUpdateAnnotationOrder = newOrder => {
    if (this.props.onUpdateAnnotationOrder) {
      this.props.onUpdateAnnotationOrder(annotation, index);
    }
  };

  onSelectAnnotation = annotationClicked => {
    const { selectedAnnotation } = this.state;
    const annotation =
      !selectedAnnotation || selectedAnnotation.id !== annotationClicked.id
        ? annotationClicked
        : null;
    this.setState({
      selectedAnnotation: annotation,
    });
  };

  addNewOnClick = () => {
    this.startEditing();
  };

  startEditing = annotation => {
    this.setState({
      isEditing: true,
      annotationToEdit: annotation || null,
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
            onUpdateAnnotation={this.onUpdateAnnotation}
            locale={this.locale}
            annotation={this.state.annotationToEdit}
            customDraftConverter={this.props.customDraftConverter}
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
                  <button onClick={this.addNewOnClick}>Add New</button>
                </FullHeightPanel.ButtonBar>
                <FullHeightPanel.Content>
                  <AnnotationList
                    selectedAnnotation={this.state.selectedAnnotation}
                    annotationList={this.canvas.annotations[0]}
                    onDeleteCallback={this.onDeleteAnnotation}
                    onSelectCallback={this.onSelectAnnotation}
                    onStartEditingCallback={this.startEditing}
                    previewRenderer={this.props.previewRenderer}
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
