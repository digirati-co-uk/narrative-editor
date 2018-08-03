import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    if (!props.apiEndpoint) {
      //TODO: proptypes
      throw 'apiEndpoint has to be specified in order to be able to save the manifest';
    }
    super(props);
  }

  empty = param => {
    console.log(param);
  };

  onSave = () => {
    let manifestJsonStr = JSON.stringify(this.props.manifestJson);
    let apiEndpoint = this.props.apiEndpoint;
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: manifestJsonStr,
    })
      .then(response => response.json())
      .then(this.props.onSuccess || this.empty)
      .catch(this.props.onError || this.empty);
  };

  render() {
    return (
      <button
        onClick={this.onSave}
        className={this.props.className || ''}
        style={this.props.style || {}}
      >
        {this.props.label || 'Save Manifest'}
      </button>
    );
  }
}
