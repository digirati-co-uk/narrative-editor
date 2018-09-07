import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './AnnotationList.scss';
import { annotations } from '@narrative-editor/presley';
import uuid from 'uuid/v1';
import { Link } from '@reach/router';

const $b = BEM.block('annotation-list');
class AnnotationList extends Component {
  render() {
    const { annotationList, addAnnotation } = this.props;
    return (
      <div className={$b}>
        {annotationList.length ? (
          <ul className={$b.element('list')}>
            {annotationList.map(annotation => (
              <li key={annotation.id} className={$b.element('item')}>
                <Link to={`/edit-annotation/${btoa(annotation.id)}`}>
                  {annotation.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={$b.element('empty-space')}>
            No annotations added yet
          </div>
        )}
        <button
          onClick={() => {
            const id = uuid();
            addAnnotation(id, { id, label: 'Untitled annotation' });
          }}
        >
          Add annotation
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  annotationList: state.annotations.order.map(id => state.annotations.list[id]),
});

const mapDispatchToProps = {
  addAnnotation: annotations.addAnnotation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotationList);
