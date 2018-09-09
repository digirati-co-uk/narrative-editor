import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnnotationEditor from '@narrative-editor/annotation-studio-editor';
import { presentation3Manifest } from '@narrative-editor/presley/src/selectors/manifest';
import pointOfInterest from '../../../public/point-of-interest';
import { parseSelectorTarget } from '@annotation-studio/bridge/es/helpers';
import { updateAnnotation } from '../../../../presley/src/spaces/annotations';

class EditAnnotationPage extends Component {
  state = { annotationId: null };

  componentWillMount() {
    this.setState({ annotationId: atob(this.props.annotationId) });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.annotationId !== this.props.annotationId) {
      this.setState({ annotationId: atob(nextProps.annotationId) });
    }
  }

  render() {
    const { manifestJson, annotation } = this.props;
    const { annotationId } = this.state;

    return (
      <div>
        <AnnotationEditor
          manifest={manifestJson.id}
          manifestJson={manifestJson}
          canvas={manifestJson.items[0].id}
          currentCanvas={manifestJson.items[0].id}
          captureModel={pointOfInterest['@id']}
          captureModelJson={pointOfInterest}
          selector={annotation ? parseSelectorTarget(annotation.target) : null}
          input={
            annotation
              ? {
                  ['https://annotation-studio.netlify.com/fields/describing/title']:
                    annotation.label || '',
                  ['https://annotation-studio.netlify.com/fields/describing/description']: annotation.body
                    ? annotation.body.value || ''
                    : '',
                }
              : {}
          }
          // selector={{ x: 1000, y: 1000, width: 300, height: 300 }}
          onCreateAnnotation={resp => {
            const p3Annotation = {
              ...resp.annotation,
              id: annotationId,
              type: 'Annotation',
              body: resp.annotation.body
                ? {
                    id: resp.annotation.body['@id'],
                    ...(resp.annotation.body || {}),
                  }
                : null,
            };
            this.props.updateAnnotation(annotationId, p3Annotation);
            this.props.onUpdateAnnotation();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state,
  annotation: state.annotations.list[atob(props.annotationId)],
  manifestJson: presentation3Manifest(state),
});

const mapDispatchToProps = {
  updateAnnotation: updateAnnotation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAnnotationPage);
