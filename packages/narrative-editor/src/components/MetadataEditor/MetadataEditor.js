import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './MetadataEditor.scss';
import TextField from '../TextField/TextField';
import MetadataPairs from '../MetadataPairs/MetadataPairs';

const $b = BEM.block('metadata-editor');
class MetadataEditor extends Component {
  updateLabel = e => this.props.updateLabel(e.target.value);
  updateSummary = e => this.props.updateSummary(e.target.value);
  updateRequiredStatement = e =>
    this.props.updateRequiredStatement(e.target.value);

  updateMetadataPairLabel = index => e =>
    this.props.updateMetadataPair(
      index,
      e.target.value,
      this.props.metadata[index].value
    );

  updateMetadataPairValue = index => e =>
    this.props.updateMetadataPair(
      index,
      this.props.metadata[index].label,
      e.target.value
    );

  addMetadataPair = () => {
    this.props.addMetadataPair('untitled', '');
  };

  removeMetadataPair = index => () => {
    this.props.removeMetadataPair(index);
  };

  reorderMetadataPair = (from, to) => {
    this.props.reorderMetadataPair(from, to);
  };

  render() {
    const {
      label,
      summary,
      metadata,
      requiredStatement,
      scroll = false,
    } = this.props;

    return (
      <div className={$b.modifiers({ scroll })}>
        <TextField
          label="Label"
          name="label"
          value={label || ''}
          onChange={this.updateLabel}
        />
        <TextField
          label="Summary"
          name="summary"
          textarea={true}
          value={summary || ''}
          onChange={this.updateSummary}
        />
        <TextField
          label="Required statement"
          name="requiredStatement"
          value={requiredStatement || ''}
          onChange={this.updateRequiredStatement}
        />
        <TextField.Label>Metadata pairs</TextField.Label>
        <MetadataPairs
          metadata={metadata}
          updateMetadataPairLabel={this.updateMetadataPairLabel}
          updateMetadataPairValue={this.updateMetadataPairValue}
          removeMetadataPair={this.removeMetadataPair}
          reorderMetadataPair={this.reorderMetadataPair}
          addMetadataPair={this.addMetadataPair}
        />
      </div>
    );
  }
}

export default MetadataEditor;
