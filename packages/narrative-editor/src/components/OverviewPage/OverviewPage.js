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
          <CanvasPanelPreview />
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
          <AnnotationList navigate={this.props.navigate} />
        </div>
      </div>
    );
  }
}

export default OverviewPage;
