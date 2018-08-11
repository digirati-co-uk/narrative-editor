import React from 'react';
import {
  SingleTileSource,
  Viewport,
  OpenSeadragonViewport,
  OpenSeadragonViewer,
  AnnotationProvider,
  AnnotationListProvider,
  AnnotationRepresentation,
  CanvasRepresentation,
  Annotation,
} from '@canvas-panel/core';
import * as Manifesto from '@stephenwf-forks/manifesto.js';

let viewport;
class CanvasPanelPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickAnnotation = ev => {
    ev.preventDefault();
    console.log('onClickAnnotation', ev);
  };

  render() {
    const props = this.props;
    // TODO: currently hard wired...
    const manifestoManifest = Manifesto.create(props.manifest, {
      locale: 'en',
    });

    const sequence = manifestoManifest.getSequenceByIndex(props.sequence || 0);
    const canvas = sequence.getCanvasById(props.canvas.id);
    // amazing piece of engineering...
    // To be able to change the manifest on the fly I had to replace the manifest provider,
    // because for some reason the canvas panel hasn't been designed to do that.
    const self = this;
    return (
      <Viewport
        maxHeight={1000}
        // maxWidth={450}
        // setRef={v => {
        //   viewport = v;
        // }}
        manifest={manifestoManifest}
        canvas={canvas}
      >
        <SingleTileSource viewportController={true}>
          {stsProps => (
            <OpenSeadragonViewport {...stsProps}>
              {osdProps => (
                <OpenSeadragonViewer
                  maxHeight={1000}
                  {...osdProps}
                  height={canvas.getHeight()}
                  width={canvas.getWidth()}
                />
              )}
            </OpenSeadragonViewport>
          )}
        </SingleTileSource>
        <AnnotationListProvider
          ratio={0.1}
          manifest={manifestoManifest}
          canvas={canvas}
        >
          {alpProps => (
            <AnnotationProvider {...alpProps}>
              {apProps => {
                let { annotations } = apProps;
                return (
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
                        }}
                        onClick={self.onClickAnnotation}
                        // growthStyle={growthStyle}
                        // bemModifiers={bemModifiers}
                      />
                    ))}
                  </CanvasRepresentation>
                );
              }}
            </AnnotationProvider>
          )}
        </AnnotationListProvider>
      </Viewport>
    );
  }
}

export default CanvasPanelPreview;
