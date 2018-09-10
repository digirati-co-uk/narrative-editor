import React, { Component } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import MetadataEditor from '../MetadataEditor/MetadataEditor.manifest';
import './OverviewPage.scss';
import BEM from '@fesk/bem-js';
import CanvasPanelPreview from '../CanvasPanelPreview/CanvasPanelPreview';
import CanvasList from '../CanvasList/CanvasList';
import AnnotationList from '../AnnotationList/AnnotationList';

const $b = BEM.block('overview-page');
class OverviewPage extends Component {
  render() {
    return (
      <div className={$b}>
        <div className={$b.element('viewer')}>
          <CanvasPanelPreview maxHeight={800} />
        </div>
        <div className={$b.element('annotations')}>
          <h2 className={$b.element('title')}>Canvases</h2>
          <p className={$b.element('subtext')}>
            A list of the canvases in this manifest. This tool only supports a
            single canvas for now.
          </p>
          <CanvasList />
          <h2 className={$b.element('title')}>Annotations</h2>
          <p className={$b.element('subtext')}>
            Add points of interest to your manifest that will be highlighted in
            your narrative.
          </p>
          <AnnotationList />
        </div>
        <div className={$b.element('metadata')}>
          <h2 className={$b.element('title')}>Manifest Metadata</h2>
          <p className={$b.element('subtext')}>
            Edit some basic information to describe your resource. This may be
            picked up and used in viewers along with your narrative.
          </p>
          <MetadataEditor scroll={true} />
        </div>
      </div>
    );
  }
}

export default OverviewPage;
