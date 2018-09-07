import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnnotationEditor from '@narrative-editor/annotation-studio-editor';
import { presentation3Manifest } from '@narrative-editor/presley/src/selectors/manifest';
import pointOfInterest from '../../../public/point-of-interest';

class EditAnnotationPage extends Component {
  state = { isEditing: false };

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
    const { annotationId, isEditing } = this.state;

    console.log(annotation, annotationId);
    return (
      <div>
        <AnnotationEditor
          manifest={manifestJson.id}
          manifestJson={manifestJson}
          canvas={manifestJson.items[0].id}
          currentCanvas={manifestJson.items[0].id}
          captureModel={pointOfInterest['@id']}
          captureModelJson={pointOfInterest}
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
          onCreateAnnotation={a => {
            console.log(a);
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

export default connect(mapStateToProps)(EditAnnotationPage);
