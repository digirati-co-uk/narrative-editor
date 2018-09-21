import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './ImportWarningBox.scss';
import ForwardIcon from '../ForwardIcon/ForwardIcon';
import { presentation2To3 } from '../../utility';

const $b = BEM.block('input-warning-box');

class ImportWarningBox extends Component {
  state = { selected: null };

  componentWillMount() {
    this.importResource(this.props.type, this.props.resource);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.resource !== this.props.resource) {
      this.importResource(newProps.type, newProps.resource);
    }
  }

  importResource(type, resource) {
    if (type === 'p2manifest-choice') {
      return this.setState({
        resource: presentation2To3(resource, true),
      });
    }
    this.setState({ resource });
  }

  render() {
    const { onChoose, type } = this.props;
    const { resource, selected } = this.state;
    if (!resource) {
      return <div>Loading...</div>;
    }

    return (
      <div className={$b}>
        <div className={$b.element('message')}>
          Your manifest has multiple canvases, please choose one to start.
        </div>
        <div className={$b.element('thumbnail-container')}>
          {resource.items.map(canvas => (
            <div
              className={$b.element('thumbnail').modifiers({
                selected: selected ? selected.id === canvas.id : false,
              })}
            >
              <div
                onClick={() =>
                  this.setState({
                    selected:
                      selected && selected.id === canvas.id ? null : canvas,
                  })
                }
                className={$b.element('thumbnail-image')}
                style={{ backgroundImage: `url(${canvas.thumbnail[0].id})` }}
              />
            </div>
          ))}
        </div>
        <div>
          {selected ? (
            <div
              onClick={() => onChoose(selected)}
              className={$b.element('choice')}
            >
              Create new manifest with image <ForwardIcon />
            </div>
          ) : null}
        </div>
        {type === 'p2manifest-choice' ? (
          <div className={$b.element('notice')}>
            Because you've added a IIIF Presentation 2 resource, this has been
            automatically converted to Presentation 3.
          </div>
        ) : null}
      </div>
    );
  }
}

export default ImportWarningBox;
