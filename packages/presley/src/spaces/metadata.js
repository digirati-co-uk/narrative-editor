import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { reorderArray } from '../utility';

// Constants
const UPDATE_LABEL = 'UPDATE_LABEL';
const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
const ADD_METADATA_PAIR = 'ADD_METADATA_PAIR';
const REMOVE_METADATA_PAIR = 'REMOVE_METADATA_PAIR';
const UPDATE_METADATA_PAIR = 'UPDATE_METADATA_PAIR';
const REORDER_METADATA_PAIR = 'REORDER_METADATA_PAIR';
const UPDATE_REQUIRED_STATEMENT = 'UPDATE_REQUIRED_STATEMENT';

const DEFAULT_STATE = {
  label: null,
  summary: null,
  metadata: [],
  requiredStatement: null,
};

const {
  updateLabel,
  updateSummary,
  addMetadataPair,
  updateMetadataPair,
  removeMetadataPair,
  reorderMetadataPair,
  updateRequiredStatement,
} = createActions({
  [UPDATE_LABEL]: label => ({ label }),
  [UPDATE_SUMMARY]: summary => ({ summary }),
  [ADD_METADATA_PAIR]: (label, value) => ({ label, value }),
  [REMOVE_METADATA_PAIR]: index => ({ index }),
  [UPDATE_METADATA_PAIR]: (index, label, value) => ({ index, label, value }),
  [REORDER_METADATA_PAIR]: (from, to) => ({ from, to }),
  [UPDATE_REQUIRED_STATEMENT]: requiredStatement => ({ requiredStatement }),
});

const reducer = handleActions(
  {
    [updateLabel]: (state, { payload: { label } }) =>
      update(state, { label: { $set: label } }),

    [updateSummary]: (state, { payload: { summary } }) =>
      update(state, {
        summary: { $set: summary },
      }),

    [addMetadataPair]: (state, { payload: { label, value } }) =>
      update(state, {
        metadata: { $push: [{ label, value }] },
      }),

    [updateMetadataPair]: (state, { payload: { index, label, value } }) =>
      update(state, {
        metadata: metadata =>
          metadata.map(
            (mValue, mIndex) => (index === mIndex ? { label, value } : mValue)
          ),
      }),

    [removeMetadataPair]: (state, { payload: { index } }) =>
      update(state, {
        metadata: metadata => metadata.filter((value, key) => key !== index),
      }),

    [reorderMetadataPair]: (state, { payload: { from, to } }) =>
      update(state, {
        metadata: reorderArray(from, to),
      }),

    [updateRequiredStatement]: (state, { payload: { requiredStatement } }) =>
      update(state, {
        requiredStatement: { $set: requiredStatement },
      }),
  },
  DEFAULT_STATE
);

export {
  updateLabel,
  updateSummary,
  addMetadataPair,
  updateMetadataPair,
  removeMetadataPair,
  reorderMetadataPair,
  updateRequiredStatement,
  reducer,
  DEFAULT_STATE,
};
