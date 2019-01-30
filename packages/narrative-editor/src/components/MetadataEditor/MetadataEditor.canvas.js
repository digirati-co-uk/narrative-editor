import MetadataEditor from './MetadataEditor';
import { connect } from 'react-redux';
import { canvas } from '@narrative-editor/presley';

const mapStateToProps = (state, props) => ({
  label: state.canvas.list[props.id].label,
  summary: state.canvas.list[props.id].summary,
  requiredStatement: state.canvas.list[props.id].requiredStatement,
  metadata: state.canvas.list[props.id].metadata,
});

const bindActionCreators = (dispatch, props) => ({
  updateLabel: label => dispatch(canvas.canvasUpdateLabel(props.id, label)),
  updateSummary: summary =>
    dispatch(canvas.canvasUpdateSummary(props.id, summary)),
  updateRequiredStatement: requiredStatement =>
    dispatch(canvas.canvasUpdateRequiredStatement(props.id, requiredStatement)),
  updateMetadataPair: (index, label, value) =>
    dispatch(canvas.canvasUpdateMetadataPair(props.id, index, label, value)),
  addMetadataPair: (label, value) =>
    dispatch(canvas.canvasAddMetadataPair(props.id, label, value)),
  removeMetadataPair: index =>
    dispatch(canvas.canvasRemoveMetadataPair(props.id, index)),
  reorderMetadataPair: (from, to) =>
    dispatch(canvas.canvasReorderMetadataPair(props.id, from, to)),
});

export default connect(
  mapStateToProps,
  bindActionCreators
)(MetadataEditor);
