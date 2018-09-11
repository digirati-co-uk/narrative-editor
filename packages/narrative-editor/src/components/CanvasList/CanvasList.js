import React, { Component } from 'react';
import { connect } from 'react-redux';
import BEM from '@fesk/bem-js';
import './CanvasList.scss';
import posed from 'react-pose';
import MetadataEditor from '../MetadataEditor/MetadataEditor.canvas';
import ReorderableList from '../ReorderableList/ReorderableList';

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
  state = { open: false };

  handleOpen = e => {
    e.preventDefault();
    this.setState({ open: true });
  };

  render() {
    const { open } = this.state;
    const { currentCanvas, canvases } = this.props;

    return (
      <ReorderableList className={$b} items={canvases}>
        {(canvas, props) => (
          <div {...props}>
            <ListItem
              key={`${canvas.id}-list-item`}
              onDoubleClick={this.handleOpen}
              data-key={canvas.id}
              className={$b.element('item').modifiers({
                isCurrent: canvas.id === currentCanvas,
              })}
              pose={open ? 'open' : 'closed'}
            >
              <div className={$b.element('sticky-header').modifiers({ open })}>
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
          </div>
        )}
      </ReorderableList>
    );
  }
}

const mapStateToProps = state => ({
  canvases: state.canvas.order.map(id => state.canvas.list[id]),
  currentCanvas: state.canvas.current,
});

export default connect(mapStateToProps)(CanvasList);
