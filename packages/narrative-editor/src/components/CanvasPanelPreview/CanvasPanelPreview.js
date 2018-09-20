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
import AnnotationProvider from '@canvas-panel/core/es/manifesto/AnnotationProvider/AnnotationProvider';
import CanvasRepresentation from '@canvas-panel/core/es/components/CanvasRepresentation/CanvasRepresentation';
import Annotation from '@canvas-panel/core/es/components/Annotation/Annotation';
import AnnotationListProvider from '@canvas-panel/core/es/manifesto/AnnotationListProvider/AnnotationListProvider';
import Viewport from '@canvas-panel/core/es/viewers/Viewport/Viewport';
import OpenSeadragonViewport from '@canvas-panel/core/es/viewers/OpenSeadragonViewport/OpenSeadragonViewport';

class CanvasPanelPreview extends Component {
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
      <Manifest jsonLd={this.props.manifest}>
        <CanvasProvider startCanvas={this.props.manifest.items[0].id}>
          <SingleTileSource>
            <FullPageViewport position="absolute" interactive={true}>
              {maxHeight ? (
                <OpenSeadragonViewport
                  viewportController={true}
                  getRef={getRef}
                  osdOptions={{ immediateRender: false, showNavigator: false }}
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
              <AnnotationListProvider ratio={0.1}>
                {alpProps => (
                  <AnnotationProvider {...alpProps}>
                    {({ annotations, ...apProps }) => (
                      <CanvasRepresentation {...apProps}>
                        {annotations.map(({ annotation, on }, key) => (
                          <Annotation
                            key={key}
                            x={on.selector.x}
                            y={on.selector.y}
                            height={on.selector.height}
                            width={on.selector.width}
                            annotation={annotation}
                            style={{
                              outline: '2px solid white',
                              pointerEvents: 'all',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </CanvasRepresentation>
                    )}
                  </AnnotationProvider>
                )}
              </AnnotationListProvider>
            </FullPageViewport>
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
