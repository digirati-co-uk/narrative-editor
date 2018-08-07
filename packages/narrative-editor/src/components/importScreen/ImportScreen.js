import React from 'react';
import './ImportScreen.scss';

export default class ImportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manifestUri: '',
      manifest: null,
      canvasIdMap: null,
      selectedCanvas: '',
      canvasPreviewUri: null,
      iiifImageUri: '',
      iiifImageUriVerified: false,
      iiifImage: null,
    };
  }

  manifestUriChanged = ev => {
    this.setState({
      manifestUri: ev.target.value,
      selectedCanvas: '',
      canvasIdMap: null,
      iiifImageUri: '',
      iiifImageUriVerified: false,
      iiifImage: null,
    });
    let self = this;

    fetch(ev.target.value)
      .then(res => res.json())
      .then(res =>
        self.setState({
          manifest: res,
          canvasIdMap: res.sequences[0].canvases.reduce((idMap, canvas) => {
            idMap[canvas['@id']] = canvas;
            return idMap;
          }, {}),
        })
      )
      .catch(err => console.log(`fail silently for now: ${err}`));
  };

  onSelectedCanvasChanged = ev => {
    const value = ev.target.value;
    this.setState({
      selectedCanvas: value || '',
      selectedImage: this.state.canvasIdMap[value].images[0].resource,
    });
    //window.selectedImage = this.state.canvasIdMap[value].images[0].resource;
  };

  imageIIIFUriChanged = ev => {
    this.setState({
      iiifImageUri: ev.target.value,
      iiifImageUriVerified: false,
      iiifImage: null,
      manifestUri: '',
      manifest: null,
      canvasIdMap: null,
      selectedCanvas: '',
    });
    let self = this;
    fetch(ev.target.value)
      .then(res => res.json())
      .then(res => {
        self.setState({
          iiifImageUriVerified: true,
          iiifImage: res,
          selectedImage: {
            '@id': `${res['@id']}/full/full/0/default.jpg`,
            '@type': 'dctypes:Image',
            service: {
              '@id': res['@id'],
              profile: res.profile[0],
              protocol: 'http://iiif.io/api/image',
              // height: res.height, //this is not needed
              // width: res.width, //this is not needed
            },
            height: res.height,
            width: res.width,
          },
        });
      })
      .catch(err => console.log(`fail silently for now: ${err}`));
  };

  isEditDisabledEdit = () => {
    return !(
      this.state.selectedCanvas !== '' || this.state.iiifImageUriVerified
    );
  };

  getPreview(canvas) {
    if (canvas.hasOwnProperty('thumbnail')) {
      return canvas.thumbnail['@id'];
    } else if (canvas.hasOwnProperty('images')) {
      return canvas.images[0].resource['@id'];
    } else {
      return '';
    }
  }

  getImagePreview(image) {
    if (image.hasOwnProperty('sizes')) {
      image.sizes.sort(
        (size1, size2) =>
          Math.abs(200 - size1.width) - Math.abs(200 - size2.width)
            ? size1
            : size2
      );
      let targetWidth = image.sizes[0].width;
      return image['@id'] + '/full/' + targetWidth + ',/0/default.jpg';
    } else {
      return image['@id'] + '/full/full/0/default.jpg';
    }
  }

  onEditClicked = () => {
    this.props.onImageSelectedCallback(this.state.selectedImage);
  };

  render() {
    let canvases =
      this.state.manifest &&
      this.state.manifest.sequences &&
      this.state.manifest.sequences[0] &&
      this.state.manifest.sequences[0].canvases
        ? this.state.manifest.sequences[0].canvases
        : [];
    let isEditDisabled = this.isEditDisabledEdit();
    return (
      <div className="screen start-screen">
        <h1 className="screen__title">Canvas Builder - Import Asset</h1>
        <div className="screen__content">
          <div className="start-screen__options">
            <div className="start-screen__option">
              <h2 className="start-screen__title">Existing Manifest</h2>
              <input
                name="manifest"
                type="url"
                placeholder="Manifest URL"
                value={this.state.manifestUri}
                onChange={this.manifestUriChanged}
              />
              <select
                name="canvas"
                value={this.state.selectedCanvas}
                onChange={this.onSelectedCanvasChanged}
              >
                <option key={''} value="">
                  Select Canvas...
                </option>
                {canvases.map((canvas, idx) => (
                  <option key={canvas['@id']} value={canvas['@id']}>
                    {canvas.label || canvas['@id']}
                  </option>
                ))}
              </select>
              {this.state.selectedCanvas !== '' ? (
                <img
                  src={this.getPreview(
                    this.state.canvasIdMap[this.state.selectedCanvas]
                  )}
                  alt={this.state.selectedCanvas}
                  style={{
                    maxWidth: '100%',
                  }}
                />
              ) : (
                ''
              )}
            </div>
            <div className="start-screen__option">
              <h2 className="start-screen__title">IIIF Image</h2>
              <input
                name="iiif_image"
                type="url"
                placeholder="IIIF Image URL"
                value={this.state.iiifImageUri}
                onChange={this.imageIIIFUriChanged}
              />
              {this.state.iiifImageUriVerified ? (
                <img
                  src={this.getImagePreview(this.state.iiifImage)}
                  alt={this.state.iiifImageUri}
                  style={{
                    maxWidth: '100%',
                  }}
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="start-screen__actions">
            <a
              // href={
              //   window.location.origin +
              //   window.location.pathname +
              //   '#iiifImage=' +
              //   this.state.selectedImage
              // }
              onClick={this.onEditClicked}
              className={'btn' + (isEditDisabled ? ' btn--disabled' : '')}
            >
              Edit
            </a>
          </div>
        </div>
      </div>
    );
  }
}
