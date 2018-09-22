import React, { Component } from 'react';
import CanvasPanelFullPagePreview from '../CanvasPanelFullPagePreview/CanvasPanelFullPagePreview';

class PreviewPage extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'relative', height: 'auto' }}>
          <div style={{ height: 800 }}>
            <CanvasPanelFullPagePreview maxHeight={800} />
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewPage;
