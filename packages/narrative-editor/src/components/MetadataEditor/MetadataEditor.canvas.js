import MetadataEditor from './MetadataEditor';
import { connect } from 'react-redux';
import { metadata } from '@narrative-editor/presley';

const mapStateToProps = (state, props) => ({
  label: state.canvas.list[props.id].label,
  summary: state.canvas.list[props.id].summary,
  requiredStatement: state.canvas.list[props.id].requiredStatement,
  metadata: state.canvas.list[props.id].metadata,
});

const bindActionCreators = (dispatch, props) => ({
  updateLabel: label => dispatch(metadata.updateLabel(props.id, label)),
  updateSummary: summary => dispatch(metadata.updateSummary(props.id, summary)),
  updateRequiredStatement: requiredStatement =>
    dispatch(metadata.updateRequiredStatement(props.id, requiredStatement)),
  updateMetadataPair: (label, value) =>
    dispatch(metadata.updateMetadataPair(props.id, label, value)),
  addMetadataPair: (label, value) =>
    dispatch(metadata.addMetadataPair(props.id, label, value)),
  removeMetadataPair: index =>
    dispatch(metadata.removeMetadataPair(props.id, index)),
  reorderMetadataPair: (from, to) =>
    dispatch(metadata.reorderMetadataPair(props.id, from, to)),
});

export default connect(
  mapStateToProps,
  bindActionCreators
)(MetadataEditor);
