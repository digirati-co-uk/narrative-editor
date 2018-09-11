import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './AnnotationList.scss';
import { annotations } from '@narrative-editor/presley';
import uuid from 'uuid/v1';
import { Link, navigate } from '@reach/router';
import AnnotationThumbnail from '../AnnotationThumbnail/AnnotationThumbnail';
import ReorderableList from '../ReorderableList/ReorderableList';

const $b = BEM.block('annotation-list');
class AnnotationList extends Component {
  goToAnnotation = id => e => {
    e.preventDefault();
    window.location.hash = `/edit-annotation/${btoa(id)}`;
  };

  createNewAnnotation = () => {
    const { addAnnotation } = this.props;
    const id = uuid();
    addAnnotation(id, { id, label: 'Untitled annotation' });
  };

  render() {
    const { annotationList, addAnnotation, updateAnnotationOrder } = this.props;

    return (
      <ReorderableList
        updateOrder={updateAnnotationOrder}
        items={annotationList}
        className={$b}
        renderEmptyState={() => (
          <div className={$b.element('empty-space')}>
            No annotations added yet
          </div>
        )}
        renderAddNew={() => (
          <button
            className={$b.element('add-button')}
            onClick={this.createNewAnnotation}
          >
            + Add annotation
          </button>
        )}
      >
        {(annotation, props, { index, isDragging }) => (
          <div
            {...props}
            onDoubleClick={this.goToAnnotation(annotation.id)}
            className={$b.element('item').modifiers({ isDragging })}
          >
            <div className={$b.element('thumbnail')}>
              <AnnotationThumbnail id={annotation.id} />
            </div>
            <div className={$b.element('detail')}>
              <Link
                className={$b.element('label')}
                to={`/edit-annotation/${btoa(annotation.id)}`}
              >
                {annotation.label}
              </Link>
              <div
                className={$b.element('body')}
                dangerouslySetInnerHTML={{
                  __html: annotation.body ? annotation.body.value || '' : '',
                }}
              />
            </div>
          </div>
        )}
      </ReorderableList>
    );
  }
}

const mapStateToProps = state => ({
  annotationList: state.annotations.order.map(id => state.annotations.list[id]),
});

const mapDispatchToProps = {
  addAnnotation: annotations.addAnnotation,
  updateAnnotationOrder: annotations.updateAnnotationOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotationList);
