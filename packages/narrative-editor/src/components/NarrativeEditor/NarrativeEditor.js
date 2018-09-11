import React, { Component } from 'react';
import {
  createHistory,
  Router,
  Location,
  LocationProvider,
  Link,
} from '@reach/router';
import { connect } from 'react-redux';
import EditAnnotationPage from '../EditAnnotationPage/EditAnnotationPage';
import OverviewPage from '../OverviewPage/OverviewPage';
import ExportPage from '../ExportPage/ExportPage';
import createHashSource, { pushHashPath } from 'hash-source';
import PreviewPage from '../PreviewPage/PreviewPage';
import ImportScreen from '../importScreen/ImportScreen';
import { tileSource, canvas, metadata } from '@narrative-editor/presley';
import uuid from 'uuid/v1';
import './NarrativeEditor.scss';
import BEM from '@fesk/bem-js/lib/index';
import posed, { PoseGroup } from 'react-pose';

const hashSource = createHashSource();
const history = createHistory(hashSource);
const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0, y: '50px', transition: { duration: 100 } },
});
const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.pathname}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

const $b = BEM.block('narrative-editor');
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
    if (!currentResource) {
      return (
        <ImportScreen
          default
          route="import"
          onImageSelectedCallback={this.onImageSelected}
        />
      );
    }
    return (
      <LocationProvider history={history}>
        <div className={$b.modifier('dark')}>
          <header className={$b.element('header')}>
            <h1 className={$b.element('title')}>Narrative editor</h1>
            <ul className={$b.element('navigation')}>
              <li className={$b.element('navigation-item')}>
                <Link to="/">Overview</Link>
              </li>
              <li className={$b.element('navigation-item')}>
                <Link to="/preview">Preview</Link>
              </li>
              <li className={$b.element('navigation-item')}>
                <Link to="/export">Export</Link>
              </li>
            </ul>
          </header>
          <main style={{ overflow: 'hidden' }}>
            <PosedRouter>
              <OverviewPage path="/" />
              <EditAnnotationPage
                path="edit-annotation/:annotationId"
                onUpdateAnnotation={() => {
                  window.location.hash = '/';
                }}
              />
              <ExportPage path="export" />
              <PreviewPage path="preview" />
            </PosedRouter>
          </main>
        </div>
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
