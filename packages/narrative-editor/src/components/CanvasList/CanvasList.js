import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './CanvasList.scss';
import posed, { PoseGroup } from 'react-pose';
import MetadataEditor from '../MetadataEditor/MetadataEditor.canvas';

const Close = posed.button({
  open: {
    opacity: 1,
    transition: { delay: 500 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0 },
  },
});

const ListItem = posed.li({
  open: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    flip: true,
    transition: {
      duration: 200,
    },
  },
  closed: {
    position: 'static',
    flip: true,
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    transition: {
      duration: 100,
    },
  },
});
const Expand = posed.div({
  open: {
    height: 'auto',
    opacity: 1,
    staggerChildren: 50,
    delayChildren: 100,
    flip: true,
  },
  closed: { height: 0, opacity: 0, flip: true },
});

const $b = BEM.block('canvas-list');
class CanvasList extends Component {
  state = {};
  render() {
    const { open } = this.state;
    const { currentCanvas, canvases } = this.props;
    return (
      <div className={$b}>
        <ul className={$b.element('list')}>
          <PoseGroup>
            {canvases.map(canvas => (
              <ListItem
                onDoubleClick={e => {
                  e.preventDefault();
                  this.setState({ open: true });
                }}
                data-key={canvas.id}
                key={canvas.id}
                className={$b.element('item').modifiers({
                  current: canvas.id === currentCanvas,
                })}
                pose={open ? 'open' : 'closed'}
              >
                <div
                  onDoubleClick={e => {
                    e.preventDefault();
                  }}
                  className={$b.element('sticky-header').modifiers({ open })}
                >
                  <span className={$b.element('label')}>{canvas.label}</span>
                  <p className={$b.element('summary')}>
                    {canvas.summary || 'no summary added'}
                  </p>
                  <Close
                    className={$b.element('close')}
                    initialPose="closed"
                    onClick={() => this.setState({ open: false })}
                  >
                    Finish editing
                  </Close>
                </div>
                <Expand initialPose="closed" style={{ overflow: 'hidden' }}>
                  <MetadataEditor id={canvas.id} />
                </Expand>
              </ListItem>
            ))}
          </PoseGroup>
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
