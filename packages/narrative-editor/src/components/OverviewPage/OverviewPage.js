import React, { Component } from 'react';
import { Link } from '@reach/router';

class OverviewPage extends Component {
  render() {
    return (
      <div>
        Overview page <Link to="/edit-annotation/123">Edit annotation</Link>
      </div>
    );
  }
}

export default OverviewPage;
