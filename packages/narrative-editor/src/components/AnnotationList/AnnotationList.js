import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './AnnotationList.scss';
import { annotations } from '@narrative-editor/presley';
import uuid from 'uuid/v1';
import { Link } from '@reach/router';
import AnnotationThumbnail from '../AnnotationThumbnail/AnnotationThumbnail';

const $b = BEM.block('annotation-list');
class AnnotationList extends Component {
  render() {
    const { annotationList, addAnnotation } = this.props;
    return (
      <div className={$b}>
        {annotationList.length ? (
          <div className={$b.element('list')}>
            {annotationList.map(annotation => (
              <div key={annotation.id} className={$b.element('item')}>
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
                      __html: annotation.body
                        ? annotation.body.value || ''
                        : '',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={$b.element('empty-space')}>
            No annotations added yet
          </div>
        )}
        <button
          className={$b.element('add-button')}
          onClick={() => {
            const id = uuid();
            addAnnotation(id, { id, label: 'Untitled annotation' });
          }}
        >
          + Add annotation
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
