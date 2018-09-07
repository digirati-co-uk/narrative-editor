import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './CanvasList.scss';

const $b = BEM.block('canvas-list');
class CanvasList extends Component {
  render() {
    const { currentCanvas, canvases } = this.props;
    return (
      <div className={$b}>
        <ul className={$b.element('list')}>
          {canvases.map(canvas => (
            <li
              key={canvas.id}
              className={$b.element('item').modifiers({
                current: canvas.id === currentCanvas,
              })}
            >
              {canvas.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  canvases: state.canvas.order.map(id => state.canvas.list[id]),
  currentCanvas: state.canvas.current,
});

export default connect(mapStateToProps)(CanvasList);
