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
import OpenSeadragonViewport from '@canvas-panel/core/es/viewers/OpenSeadragonViewport/OpenSeadragonViewport';
import './CanvasPanelPreview.scss';
import Viewport from '@canvas-panel/core/es/viewers/Viewport/Viewport';

class CanvasPanelPreview extends Component {
  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { getRef, manifest, ...props } = this.props;

    if (error) {
      return 'Something went wrong';
    }

    const maxHeight = window.innerHeight - 50;

    return (
      <div style={{ height: 500, position: 'relative', width: '100%' }}>
        <Manifest jsonLd={manifest}>
          <CanvasProvider startCanvas={manifest.items[0].id}>
            <SingleTileSource>
              {maxHeight ? (
                <Viewport maxHeight={maxHeight}>
                  <OpenSeadragonViewport>
                    <OpenSeadragonViewer
                      viewportController={true}
                      getRef={getRef}
                      maxHeight={maxHeight}
                      {...props}
                    />
                  </OpenSeadragonViewport>
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
                </Viewport>
              ) : (
                <FullPageViewport
                  position="absolute"
                  interactive={true}
                  getRef={getRef}
                >
                  <OpenSeadragonViewer viewportController={true} {...props} />
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
              )}
            </SingleTileSource>
          </CanvasProvider>
        </Manifest>
      </div>
    );

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Manifest jsonLd={manifest}>
          <CanvasProvider startCanvas={manifest.items[0].id}>
            <SingleTileSource>
              <FullPageViewport
                position="absolute"
                interactive={true}
                style={{ height: '100vh' }}
              >
                <OpenSeadragonViewer viewportController={true} {...props} />
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  manifest: presentation3Manifest(state, props),
});

export default connect(mapStateToProps)(CanvasPanelPreview);
