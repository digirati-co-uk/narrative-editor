import React, { Component } from 'react';
import {
  createHistory,
  Router,
  Location,
  LocationProvider,
  Link,
  navigate,
} from '@reach/router';
import { connect } from 'react-redux';
import EditAnnotationPage from '../EditAnnotationPage/EditAnnotationPage';
import OverviewPage from '../OverviewPage/OverviewPage';
import ExportPage from '../ExportPage/ExportPage';
import createHashSource, { pushHashPath } from 'hash-source';
import PreviewPage from '../PreviewPage/PreviewPage';
import ImportPage from '../ImportPage/ImportPage';
import {
  tileSource,
  canvas,
  metadata,
  annotations,
  reset,
} from '@narrative-editor/presley';
import uuid from 'uuid/v1';
import './NarrativeEditor.scss';
import BEM from '@fesk/bem-js/lib/index';
import posed, { PoseGroup } from 'react-pose';
import ManifestPage from '../ManifestPage/ManifestPage';

const hashSource = createHashSource();
const history = createHistory(hashSource);
const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0, transition: { duration: 100 } },
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

const extractLanguage = (field, defaultValue = '') => {
  if (!field) {
    return defaultValue;
  }
  if (field.en) {
    return field.en[0];
  }

  const first = Object.values(field)[0];

  return first ? first[0] : defaultValue;
};

const $b = BEM.block('narrative-editor');
class NarrativeEditor extends Component {
  onImageSelected = source => {
    this.props.changeTileSource(source);
    const canvasId = uuid();
    this.props.createCanvas(canvasId);
    this.props.updateLabel('Untitled manifest');
    this.props.canvasUpdateLabel(canvasId, 'Untitled canvas');
  };

  startAgain = () => {
    if (window.confirm('Are you sure you want to discard your work?')) {
      this.props.purge().then(() => {
        this.props.startAgain();
      });
    }
  };

  handleChooseManifest = selectedManifest => {
    const { dispatch } = this.props;
    if (selectedManifest.id) {
      dispatch(metadata.updateId(selectedManifest.id));
    }
    if (selectedManifest.label) {
      dispatch(
        metadata.updateLabel(
          extractLanguage(selectedManifest.label, 'Untitled manifest')
        )
      );
    }

    if (selectedManifest.summary) {
      dispatch(
        metadata.updateSummary(extractLanguage(selectedManifest.summary, ''))
      );
    }

    if (selectedManifest.metadata) {
      selectedManifest.metadata.forEach(metadataPair => {
        dispatch(
          metadata.addMetadataPair(
            extractLanguage(metadataPair.label, 'Untitled'),
            extractLanguage(metadataPair.value)
          )
        );
      });
    }

    this.importCanvas(selectedManifest.items[0]);
  };

  importCanvas = selectedCanvas => {
    const { dispatch } = this.props;

    const id = selectedCanvas.id || uuid();

    dispatch(canvas.createCanvas(id));

    dispatch(
      canvas.canvasUpdateLabel(
        id,
        extractLanguage(selectedCanvas.label, 'Untitled canvas')
      )
    );

    if (selectedCanvas.summary) {
      dispatch(
        canvas.canvasUpdateSummary(id, extractLanguage(selectedCanvas.summary))
      );
    }

    if (selectedCanvas.metadata) {
      selectedCanvas.metadata.forEach(metadataPair => {
        dispatch(
          canvas.canvasAddMetadataPair(
            id,
            extractLanguage(metadataPair.label, 'Untitled'),
            extractLanguage(metadataPair.value)
          )
        );
      });
    }

    const annotationList = selectedCanvas.items[0];
    const annotation = annotationList.items[0];

    if (
      selectedCanvas.annotations &&
      selectedCanvas.annotations[0] &&
      selectedCanvas.annotations[0].items
    ) {
      selectedCanvas.annotations[0].items.forEach(singleAnnotation => {
        dispatch(
          annotations.addAnnotation(singleAnnotation.id, singleAnnotation)
        );
      });
    }

    this.props.changeTileSource(annotation.body);
  };

  handleChooseCanvas = selectedCanvas => {
    this.importCanvas(selectedCanvas);
  };

  render() {
    const { currentResource, changeTileSource, startAgain, purge } = this.props;

    if (!currentResource) {
      return (
        <ImportPage
          default
          route="import"
          onChooseCanvas={this.handleChooseCanvas}
          onChooseManifest={this.handleChooseManifest}
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
                <Link to="/manifest">Manifest</Link>
              </li>
              <li className={$b.element('navigation-item')}>
                <Link to="/preview">Preview</Link>
              </li>
              <li className={$b.element('navigation-item')}>
                <Link to="/export">Export</Link>
              </li>
              <li
                className={$b
                  .element('navigation-item')
                  .modifier('start-again')}
                onClick={this.startAgain}
              >
                Start again?
              </li>
            </ul>
          </header>
          <main style={{ overflow: 'hidden', height: '100vh' }}>
            <PosedRouter>
              <OverviewPage navigate={history.navigate} path="/" />
              <ManifestPage path="/manifest" />
              <EditAnnotationPage
                path="edit-annotation/:annotationId"
                onUpdateAnnotation={() => {
                  history.navigate('/');
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
  dispatch: ev => ev,
  changeTileSource: tileSource.changeTileSource,
  createCanvas: canvas.createCanvas,
  updateLabel: metadata.updateLabel,
  canvasUpdateLabel: canvas.canvasUpdateLabel,
  startAgain: reset,
};

export default connect(
  mapStateToProps,
  bindActionCreators
)(NarrativeEditor);
