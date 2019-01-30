import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import { PoseGroup } from 'react-pose';
import posed from 'react-pose';
import './StatusIcon.scss';

const $b = BEM.block('status-icon');

const Ball = posed.div({
  up: { y: -7, duration: 200 },
  down: { y: 0, duration: 200 },
});

const BallContainer = posed.div({
  up: { staggerChildren: 200 / 3 },
  down: { staggerChildren: 200 / 3 },
});

class StatusIcon extends Component {
  timer = null;
  state = { open: false };

  static defaultProps = { status: '' };

  constructor(props) {
    super(props);
    if (props.status === 'loading') {
      this.makeLoadingTimer();
    }
  }

  makeLoadingTimer() {
    this.timer = setInterval(() => {
      this.setState(s => ({ open: !s.open }));
    }, 300);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.status !== this.props.status) {
      if (newProps.status === 'loading') {
        this.makeLoadingTimer();
      }
      if (this.props.status === 'loading') {
        clearInterval(this.timer);
      }
    }
  }

  getPose() {
    const { open } = this.state;
    const { status } = this.props;

    if (status === 'loading') {
      return open ? 'up' : 'down';
    }
    return status;
  }

  getIcon() {
    const { status } = this.props;

    if (status === 'warning') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      );
    }

    if (status === 'success') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      );
    }

    if (status === 'error') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    }

    return null;
  }

  render() {
    const { status } = this.props;

    return (
      <div className={$b.modifier(status || '')}>
        <BallContainer
          className={$b.element('ball-container')}
          pose={this.getPose()}
        >
          <PoseGroup>
            <Ball key={1} className={$b.element('ball')} />
            <Ball key={2} className={$b.element('ball').modifier('icon')}>
              <div className={$b.element('ball-icon')}>{this.getIcon()}</div>
            </Ball>
            <Ball key={3} className={$b.element('ball')} />
          </PoseGroup>
        </BallContainer>
      </div>
    );
  }
}

export default StatusIcon;
