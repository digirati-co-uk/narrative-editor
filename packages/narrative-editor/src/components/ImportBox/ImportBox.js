import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './ImportBox.scss';
import posed, { PoseGroup } from 'react-pose';
import StatusIcon from '../StatusIcon/StatusIcon';

const $b = BEM.block('import-box');

class ImportBox extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className={$b}>
        <div className={$b.element('input-box')}>
          <input
            type="text"
            onChange={this.handleChange}
            className={$b.element('input')}
          />
        </div>
        <div className={$b.element('status-icon')}>
          <StatusIcon status={this.props.status} />
        </div>
      </div>
    );
  }
}

export default ImportBox;
