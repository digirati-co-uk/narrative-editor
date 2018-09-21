import React, { Component } from 'react';
import { getAnnotationIndex } from '@narrative-editor/presley/src/selectors/annotations';
import { getImageService } from '@narrative-editor/presley/src/selectors/tileSource';
import { connect } from 'react-redux';
import { AnnotationSelector } from '@annotation-studio/redux/es/lib/elucidate';
import BEM from '@fesk/bem-js';
import './AnnotationThumbnail.scss';

const $b = BEM.block('annotation-thumbnail');
class AnnotationThumbnail extends Component {
  state = { imageService: null, selector: null, bigly: false };

  cache = {};

  componentWillMount() {
    if (this.props.imageService) {
      console.log(this.props.imageService);
      fetch(`${this.props.imageService}/info.json`)
        .then(r => r.json())
        .then(resp => {
          const selector = AnnotationSelector.parse(
            this.props.annotation.target
          );

          this.setState({ imageService: resp, selector });
        });
    }
  }

  getImage() {
    const { selector } = this.state;
    if (!selector) {
      return null;
    }
    const { x, y, width, height } = selector.target;
    const { imageService } = this.props;
    return `${imageService}/${x},${y},${width},${height}/256,/0/default.jpg`;
  }

  render() {
    const { bigly } = this.state;
    const image = this.getImage();

    if (!image) {
      return null;
    }

    return (
      <div className={$b.modifiers({ bigly })}>
        <img
          onClick={() => this.setState(s => ({ bigly: !s.bigly }))}
          src={image}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const annotationId = props.id;
  const annotation = getAnnotationIndex(state)[annotationId];
  const imageService = getImageService(state);
  return {
    annotation,
    imageService,
  };
};

export default connect(mapStateToProps)(AnnotationThumbnail);
