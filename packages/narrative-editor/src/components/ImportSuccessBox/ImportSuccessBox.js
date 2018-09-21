import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import { presentation2To3, wrapImageService } from '../../utility';
import ForwardIcon from '../ForwardIcon/ForwardIcon';
import './ImportSuccessBox.scss';

const $b = BEM.block('import-success-box');
class ImportSuccessBox extends Component {
  componentWillMount() {
    this.importResource(this.props.type, this.props.resource);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.resource !== this.props.resource) {
      this.importResource(newProps.type, this.props.resource);
    }
  }

  importResource(type, resource) {
    if (type === 'p2manifest') {
      return this.setState({
        resource: presentation2To3(resource),
      });
    }
    if (type === 'imageService') {
      return this.setState({
        resource: wrapImageService(resource),
      });
    }

    return this.setState({
      resource,
    });
  }

  chooseManifest = () => {
    const { resource } = this.state;
    const { onChooseManifest } = this.props;
    onChooseManifest(resource);
  };

  chooseCanvas = () => {
    const { resource } = this.state;
    const { onChooseCanvas } = this.props;
    onChooseCanvas(resource.items[0]);
  };

  render() {
    const { type } = this.props;
    if (type === 'imageService') {
      return (
        <div className={$b}>
          <div className={$b.element('heading')}>
            Your image is ready to edit
          </div>
          <div className={$b.element('choice')} onClick={this.chooseCanvas}>
            Create new manifest with image <ForwardIcon />
          </div>
        </div>
      );
    }

    return (
      <div className={$b}>
        <div className={$b.element('heading')}>
          Your manifest is ready to edit, what would you like to do
        </div>

        <div className={$b.element('choice')} onClick={this.chooseManifest}>
          Edit the full manifest <ForwardIcon />
        </div>
        <div className={$b.element('choice')} onClick={this.chooseCanvas}>
          Create new manifest with image <ForwardIcon />
        </div>
        {type === 'p2manifest' ? (
          <div className={$b.element('notice')}>
            Because you've added a IIIF Presentation 2 resource, this has been
            automatically converted to Presentation 3.
          </div>
        ) : null}
      </div>
    );
  }
}

export default ImportSuccessBox;
