import React, { Component } from 'react';
import ImportScreen from '../importScreen/ImportScreen';

class ImportPage extends Component {
  render() {
    const { onImportResource } = this.props;
    return (
      <div>
        <ImportScreen onImageSelectedCallback={onImportResource} />
      </div>
    );
  }
}

export default ImportPage;
