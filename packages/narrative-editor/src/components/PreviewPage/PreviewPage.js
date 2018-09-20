import React, { Component } from 'react';
import CanvasPanelPreview from '../CanvasPanelPreview/CanvasPanelPreview';

class PreviewPage extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'relative', height: 'auto' }}>
          <div style={{ height: 800 }}>
            <CanvasPanelPreview maxHeight={800} />
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewPage;
