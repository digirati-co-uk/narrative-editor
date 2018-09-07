import MetadataEditor from './MetadataEditor';
import { connect } from 'react-redux';
import { metadata } from '@narrative-editor/presley';

const mapStateToProps = state => ({
  label: state.metadata.label,
  summary: state.metadata.summary,
  requiredStatement: state.metadata.requiredStatement,
  metadata: state.metadata.metadata,
});

const bindActionCreators = {
  updateLabel: metadata.updateLabel,
  updateSummary: metadata.updateSummary,
  updateRequiredStatement: metadata.updateRequiredStatement,
  updateMetadataPair: metadata.updateMetadataPair,
  addMetadataPair: metadata.addMetadataPair,
  removeMetadataPair: metadata.removeMetadataPair,
  reorderMetadataPair: metadata.reorderMetadataPair,
};

export default connect(
  mapStateToProps,
  bindActionCreators
)(MetadataEditor);
