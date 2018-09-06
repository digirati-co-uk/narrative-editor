import React, { Component } from 'react';
import { createHistory, Router, LocationProvider, Link } from '@reach/router';
import { connect } from 'react-redux';
import Homepage from '../Homepage/Homepage';
import EditAnnotationPage from '../EditAnnotationPage/EditAnnotationPage';
import OverviewPage from '../OverviewPage/OverviewPage';
import ExportPage from '../ExportPage/ExportPage';
import createHashSource from 'hash-source';
import PreviewPage from '../PreviewPage/PreviewPage';
import ImportScreen from '../importScreen/ImportScreen';
import { tileSource, canvas, metadata } from '@narrative-editor/presley';
import uuid from 'uuid/v1';

const history = createHistory(createHashSource());

class NarrativeEditor extends Component {
  onImageSelected = source => {
    this.props.changeTileSource(source);
    const canvasId = uuid();
    this.props.createCanvas(canvasId);
    this.props.updateLabel('Untitled manifest');
    this.props.canvasUpdateLabel(canvasId, 'Untitled canvas');
  };

  render() {
    const { currentResource, changeTileSource } = this.props;
    return (
      <LocationProvider history={history}>
        <Router>
          {currentResource ? (
            <Homepage path="/" currentResource={currentResource}>
              <OverviewPage default path="/" />
              <EditAnnotationPage path="/edit-annotation/:annotationId" />
              <ExportPage path="export" />
              <PreviewPage path="preview" />
            </Homepage>
          ) : (
            <ImportScreen
              default
              route="/import"
              onImageSelectedCallback={this.onImageSelected}
            />
          )}
        </Router>
      </LocationProvider>
    );
  }
}

const mapStateToProps = state => ({
  currentResource: state.tileSource.current,
});

const bindActionCreators = {
  changeTileSource: tileSource.changeTileSource,
  createCanvas: canvas.createCanvas,
  updateLabel: metadata.updateLabel,
  canvasUpdateLabel: canvas.canvasUpdateLabel,
};

export default connect(
  mapStateToProps,
  bindActionCreators
)(NarrativeEditor);
