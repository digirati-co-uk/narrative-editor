import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './ImportPage.scss';
import ImportBox from '../ImportBox/ImportBox';
import ImportWarningBox from '../ImportWarningBox/ImportWarningBox';
import ImportSuccessBox from '../ImportSuccessBox/ImportSuccessBox';

const $b = BEM.block('import-page');

class ImportPage extends Component {
  state = { status: null, type: null, resource: null };

  handleChange = value => {
    if (!value) {
      return this.setState({ status: null, type: null, resource: null });
    }

    this.setState({ status: 'loading' });
    fetch(value)
      .then(e => e.json())
      .then(resp => {
        if (resp.type === 'Manifest') {
          if (resp.items.length > 1) {
            return this.setState({
              resource: resp,
              type: 'p3manifest-choice',
              status: 'warning',
            });
          }
          return this.setState({
            resource: resp,
            type: 'p3manifest',
            status: 'success',
          });
        }
        if (resp['@type'] === 'sc:Manifest') {
          if (resp.sequences[0].canvases.length > 1) {
            return this.setState({
              resource: resp,
              type: 'p2manifest-choice',
              status: 'warning',
            });
          }

          return this.setState({
            resource: resp,
            type: 'p2manifest',
            status: 'success',
          });
        }
        if (resp.profile && resp.width && resp.height) {
          return this.setState({
            resource: resp,
            type: 'imageService',
            status: 'success',
          });
        }
        throw Error('Unknown IIIF resource');
      })
      .catch(err => {
        this.setState({ status: 'error', type: null, resource: null });
      });
  };

  render() {
    const { onChooseCanvas, onChooseManifest } = this.props;
    const { status, type, resource } = this.state;
    return (
      <div className={$b}>
        <div className={$b.element('inner')}>
          <h1 className={$b.element('heading')}>Narrative editor</h1>
          <ImportBox onChange={this.handleChange} status={status} />
          <div className={$b.element('body')}>
            {!status ? (
              <div className={$b.element('testing')}>
                Try a few of these out for testing.
                <ul>
                  <li>
                    https://framemark.vam.ac.uk/collections/2013GU2911/info.json
                  </li>
                  <li>https://stephenwf.github.io/ocean-liners.json</li>
                  <li>
                    https://view.nls.uk/manifest/7446/74464117/manifest.json
                  </li>
                  <li>https://wellcomelibrary.org/iiif/b28481331/manifest</li>
                </ul>
              </div>
            ) : null}
            {status === 'warning' ? (
              <ImportWarningBox
                onChoose={onChooseCanvas}
                resource={resource}
                type={type}
              />
            ) : null}
            {status === 'success' ? (
              <ImportSuccessBox
                type={type}
                resource={resource}
                onChooseManifest={onChooseManifest}
                onChooseCanvas={onChooseCanvas}
              />
            ) : null}
            {status === 'error' ? (
              <div className={$b.element('error')}>
                I'm sorry but we do not support that type of resource yet.
              </div>
            ) : null}
          </div>
        </div>
        <div className={$b.element('footer')}>
          <div className={$b.element('footer-logos')}>
            Presented by V&A Museum and Digirati
          </div>
          <div className={$b.element('footer-menu')}>About this project</div>
        </div>
      </div>
    );
  }
}

export default ImportPage;
