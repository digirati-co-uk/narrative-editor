import React, { Component } from 'react';
import { connect } from 'react-redux';
import { presentation3Manifest } from '../../../../presley/src/selectors/manifest';

class ExportPage extends Component {
  static defaultProps = {
    idPrefix: 'https://digirati.com/narrative-editor/1.0',
  };

  getJson() {
    const {
      id,
      type,
      label,
      summary,
      requiredStatement,
      metadata,
      items,
    } = this.props;
    return {
      id,
      type,
      label,
      summary,
      requiredStatement,
      metadata,
      items,
    };
  }

  render() {
    return (
      <div>
        Export page
        <div style={{ overflow: 'auto', height: 500 }}>
          <pre>
            <code>{JSON.stringify(this.getJson(), null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default connect(presentation3Manifest)(ExportPage);
