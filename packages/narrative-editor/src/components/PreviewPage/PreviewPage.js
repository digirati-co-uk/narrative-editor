import React, { Component } from 'react';
import CanvasPanelPreview from '../CanvasPanelPreview/CanvasPanelPreview';

class PreviewPage extends Component {
  render() {
    return (
      <div style={{ position: 'relative', height: 'auto' }}>
        <CanvasPanelPreview maxHeight={800} />
      </div>
    );
  }
}

export default PreviewPage;
