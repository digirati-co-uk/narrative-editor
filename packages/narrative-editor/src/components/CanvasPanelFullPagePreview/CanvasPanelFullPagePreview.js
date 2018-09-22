import React, { Component } from 'react';
import { connect } from 'react-redux';
import { presentation3Manifest } from '../../../../presley/src/selectors/manifest';
import { FullPageViewer } from '@canvas-panel/full-page-plugin';

class CanvasPanelFullPagePreview extends Component {
  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { maxHeight = '100vh', getRef, ...props } = this.props;

    if (error) {
      return 'Something went wrong';
    }

    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <FullPageViewer
          jsonLd={this.props.manifest}
          title="Ocean liners"
          annotationPosition="top"
        >
          <strong>Testing</strong>
        </FullPageViewer>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  manifest: presentation3Manifest(state, props),
});

export default connect(mapStateToProps)(CanvasPanelFullPagePreview);
