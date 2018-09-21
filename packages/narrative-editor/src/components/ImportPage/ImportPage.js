import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './ImportPage.scss';

const $b = BEM.block('import-page');

class ImportPage extends Component {
  render() {
    const { onImportResource } = this.props;
    return (
      <div className={$b}>
        <div className={$b.element('inner')}>
          <h1 className={$b.element('heading')}>Narrative editor</h1>
        </div>
      </div>
    );
  }
}

export default ImportPage;
