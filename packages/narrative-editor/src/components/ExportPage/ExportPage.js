import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExportPage extends Component {
  static defaultProps = {
    idPrefix: 'https://digirati.com/narrative-editor/1.0',
  };

  getJson() {
    const {
      id,
      type,
      label,
      summary,
      requiredStatement,
      metadata,
      items,
    } = this.props;
    return {
      id,
      type,
      label,
      summary,
      requiredStatement,
      metadata,
      items,
    };
  }

  render() {
    return (
      <div>
        Export page
        <pre>{JSON.stringify(this.getJson(), null, 2)}</pre>
      </div>
    );
  }
}

const t = value => ({ en: [value] });

/**
 * This is the work-in-progress manifest from state.
 * The current state model only handles a single set of annotations, and a single
 * image resource. But this will be expanded for future iterations of this work.
 *
 * You can have multiple canvases in the model currently.
 * @todo move to presley
 */
const mapStateToProps = (state, props) => {
  const idPrefix =
    props.idPrefix || 'https://digirati.com/narrative-editor/1.0';

  const currentCanvas = state.canvas.list[state.canvas.current];
  const tileSource = state.tileSource.current;

  return {
    id: `${idPrefix}/manifest1`,
    type: 'Manifest',
    label: t(state.metadata.label),
    summary: t(state.metadata.summary),
    requiredStatement: t(state.metadata.requiredStatement),
    metadata: state.metadata.metadata.map(item => ({
      label: t(item.label),
      value: t(item.value),
    })),
    items: [
      {
        id: idPrefix + currentCanvas.id,
        type: 'Canvas',
        label: t(currentCanvas.label),
        summary: t(currentCanvas.summary),
        requiredStatement: t(currentCanvas.requiredStatement),
        metadata: currentCanvas.metadata.map(item => ({
          label: t(item.label),
          value: t(item.value),
        })),
        height: tileSource.height,
        width: tileSource.width,
        items: [
          {
            id: idPrefix + currentCanvas.id + '/annoPage1',
            type: 'AnnotationPage',
            items: [
              {
                id: idPrefix + currentCanvas.id + '/anno1',
                body: {
                  ...tileSource,
                  id: tileSource['@id'] || tileSource.id,
                  type: 'Image',
                  service: {
                    ...tileSource.service,
                    id: tileSource.service['@id'] || tileSource.service.id,
                  },
                },
                motivation: 'painting',
                type: 'Annotation',
                target: idPrefix + currentCanvas.id,
              },
            ],
          },
        ],
      },
    ],
  };
};

export default connect(mapStateToProps)(ExportPage);
