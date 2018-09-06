import React, { Component } from 'react';
import { Link } from '@reach/router';

class Homepage extends Component {
  componentWillMount() {
    console.log(this.props.currentResource);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Narrative editor</h1>
          <ul>
            <li>
              <Link to="/">Overview</Link>
            </li>
            <li>
              <Link to="/preview">Preview</Link>
            </li>
            <li>
              <Link to="/export">Export</Link>
            </li>
          </ul>
        </header>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Homepage;
