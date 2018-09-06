import React, { Component } from 'react';

class EditAnnotationPage extends Component {
  render() {
    const { annotationId } = this.props;
    return <div>Editing annotation: {annotationId}</div>;
  }
}

export default EditAnnotationPage;
