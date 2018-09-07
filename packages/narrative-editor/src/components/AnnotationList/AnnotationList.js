import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './AnnotationList.scss';

const $b = BEM.block('annotation-list');
class AnnotationList extends Component {
  render() {
    const { annotations } = this.props;
    return (
      <div className={$b}>
        {annotations.length ? (
          <ul className={$b.element('list')}>
            {annotations.map(annotation => (
              <li key={annotation.id} className={$b.element('item')}>
                {annotation.label}
              </li>
            ))}
          </ul>
        ) : (
          <div className={$b.element('empty-space')}>
            No annotations added yet
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  annotations: state.annotations.order.map(id => state.annotations.list[id]),
});

export default connect(mapStateToProps)(AnnotationList);
