import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewer,
  FullPageViewport,
} from '@canvas-panel/core';
import { presentation3Manifest } from '../../../../presley/src/selectors/manifest';
import { currentCanvasId } from '../../../../presley/src/selectors/canvas';

class CanvasPanelPreview extends Component {
  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { canvas, maxHeight, getRef, ...props } = this.props;

    if (error) {
      return 'Something went wrong';
    }

    return (
      <Manifest jsonLd={this.props.manifest}>
        <CanvasProvider startCanvas={this.props.manifest.items[0].id}>
          <SingleTileSource>
            {maxHeight ? (
              <OpenSeadragonViewer
                getRef={getRef}
                maxHeight={maxHeight}
                {...props}
              />
            ) : (
              <FullPageViewport
                position="absolute"
                interactive={true}
                getRef={getRef}
              >
                <OpenSeadragonViewer viewportController={true} {...props} />
              </FullPageViewport>
            )}
          </SingleTileSource>
        </CanvasProvider>
      </Manifest>
    );
  }
}

const mapStateToProps = (state, props) => ({
  manifest: presentation3Manifest(state, props),
});

export default connect(mapStateToProps)(CanvasPanelPreview);
