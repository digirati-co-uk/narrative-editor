import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './TextField.scss';

const $b = BEM.block('text-field');
class TextField extends Component {
  render() {
    const { label, name, value, onChange, textarea } = this.props;
    return (
      <div className={$b}>
        <TextField.Label className={$b.element('label')}>
          {label}
        </TextField.Label>
        {textarea ? (
          <textarea
            name={name}
            onChange={onChange}
            value={value || ''}
            className={$b.element('input').modifier('textarea')}
          />
        ) : (
          <input
            name={name}
            value={value || ''}
            onChange={onChange}
            className={$b.element('input')}
            type="text"
          />
        )}
      </div>
    );
  }
}

TextField.Label = ({ children }) => (
  <label className={$b.element('label')}>{children}</label>
);

export default TextField;
