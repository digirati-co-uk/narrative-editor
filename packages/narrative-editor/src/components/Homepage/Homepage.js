import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Homepage.scss';
import BEM from '@fesk/bem-js';

const $b = BEM.block('homepage');
class Homepage extends Component {
  render() {
    return (
      <div className={$b}>
        <header className={$b.element('header')}>
          <h1 className={$b.element('title')}>Narrative editor</h1>
          <ul className={$b.element('navigation')}>
            <li className={$b.element('navigation-item')}>
              <Link to="/">Overview</Link>
            </li>
            <li className={$b.element('navigation-item')}>
              <Link to="/preview">Preview</Link>
            </li>
            <li className={$b.element('navigation-item')}>
              <Link to="/export">Export</Link>
            </li>
          </ul>
        </header>
        <main style={{ overflow: 'hidden' }}>{this.props.children}</main>
      </div>
    );
  }
}

export default Homepage;
