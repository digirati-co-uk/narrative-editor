import React, { Component } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import MetadataEditor from '../MetadataEditor/MetadataEditor.manifest';
import './ManifestPage.scss';
import BEM from '@fesk/bem-js';
import CanvasPanelPreview from '../CanvasPanelPreview/CanvasPanelPreview';
import CanvasList from '../CanvasList/CanvasList';
import AnnotationList from '../AnnotationList/AnnotationList';

const $b = BEM.block('manifest-page');
class ManifestPage extends Component {
  render() {
    return (
      <div className={$b}>
        <div className={$b.element('viewer')}>
          <CanvasPanelPreview />
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

export default ManifestPage;
