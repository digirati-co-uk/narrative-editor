// Constants.
import { createActions, handleActions } from 'redux-actions';
import { reorderArray } from '../utility';
import update from 'immutability-helper';

const CREATE_CANVAS = 'CREATE_CANVAS';
const REMOVE_CANVAS = 'REMOVE_CANVAS';
const RECOVER_CANVAS = 'RECOVER_CANVAS';
const UPDATE_CANVAS_ORDER = 'UPDATE_CANVAS_ORDER';
const SELECT_CANVAS = 'SELECT_CANVAS';

const CANVAS_UPDATE_LABEL = 'CANVAS_UPDATE_LABEL';
const CANVAS_UPDATE_SUMMARY = 'CANVAS_UPDATE_SUMMARY';
const CANVAS_ADD_METADATA_PAIR = 'CANVAS_ADD_METADATA_PAIR';
const CANVAS_REMOVE_METADATA_PAIR = 'CANVAS_REMOVE_METADATA_PAIR';
const CANVAS_UPDATE_METADATA_PAIR = 'CANVAS_UPDATE_METADATA_PAIR';
const CANVAS_REORDER_METADATA_PAIR = 'CANVAS_REORDER_METADATA_PAIR';
const CANVAS_UPDATE_REQUIRED_STATEMENT = 'CANVAS_UPDATE_REQUIRED_STATEMENT';

const DEFAULT_STATE = {
  current: null,
  list: {},
  order: [],
};

const DEFAULT_CANVAS_STATE = {
  label: null,
  summary: null,
  metadata: [],
  requiredStatement: null,
};

const {
  createCanvas,
  removeCanvas,
  recoverCanvas,
  updateCanvasOrder,
  selectCanvas,
  canvasUpdateLabel,
  canvasUpdateSummary,
  canvasAddMetadataPair,
  canvasUpdateMetadataPair,
  canvasRemoveMetadataPair,
  canvasReorderMetadataPair,
  canvasUpdateRequiredStatement,
} = createActions({
  [CREATE_CANVAS]: id => ({ id }),
  [REMOVE_CANVAS]: id => ({ id }),
  [RECOVER_CANVAS]: id => ({ id }),
  [SELECT_CANVAS]: id => ({ id }),
  [UPDATE_CANVAS_ORDER]: (from, to) => ({ from, to }),
  [CANVAS_UPDATE_LABEL]: (id, label) => ({ id, label }),
  [CANVAS_UPDATE_SUMMARY]: (id, summary) => ({ id, summary }),
  [CANVAS_ADD_METADATA_PAIR]: (id, label, value) => ({ id, label, value }),
  [CANVAS_REMOVE_METADATA_PAIR]: (id, index) => ({ id, index }),
  [CANVAS_UPDATE_METADATA_PAIR]: (id, index, label, value) => ({
    id,
    index,
    label,
    value,
  }),
  [CANVAS_REORDER_METADATA_PAIR]: (id, from, to) => ({ id, from, to }),
  [CANVAS_UPDATE_REQUIRED_STATEMENT]: (id, requiredStatement) => ({
    id,
    requiredStatement,
  }),
});

const reducer = handleActions(
  {
    [createCanvas]: (state, { payload: { id } }) =>
      update(state, {
        current: { $set: id },
        order: { $push: [id] },
        list: {
          [id]: { $set: { id, ...DEFAULT_CANVAS_STATE } },
        },
      }),

    [removeCanvas]: (state, { payload: { id } }) =>
      update(state, {
        current: { $set: state.current === id ? null : state.current },
        order: ids => ids.filter(currentId => currentId !== id),
      }),

    [recoverCanvas]: (state, { payload: { id } }) =>
      state.list[id]
        ? update(state, {
            order: { $push: [id] },
          })
        : state,

    [updateCanvasOrder]: (state, { payload: { from, to } }) =>
      update(state, {
        order: reorderArray(from, to),
      }),

    [selectCanvas]: (state, { payload: { id } }) =>
      update(state, {
        current: { $set: id },
      }),

    [canvasUpdateLabel]: (state, { payload: { id, label } }) =>
      update(state, {
        list: {
          [id]: {
            label: { $set: label },
          },
        },
      }),

    [canvasUpdateSummary]: (state, { payload: { id, summary } }) =>
      update(state, {
        list: {
          [id]: { summary: { $set: summary } },
        },
      }),

    [canvasAddMetadataPair]: (state, { payload: { id, label, value } }) =>
      update(state, {
        list: {
          [id]: {
            metadata: { $push: [{ label, value }] },
          },
        },
      }),

    [canvasUpdateMetadataPair]: (
      state,
      { payload: { id, index, label, value } }
    ) =>
      update(state, {
        list: {
          [id]: {
            metadata: metadata =>
              metadata.map(
                (mValue, mIndex) =>
                  index === mIndex ? { label, value } : mValue
              ),
          },
        },
      }),

    [canvasRemoveMetadataPair]: (state, { payload: { id, index } }) =>
      update(state, {
        list: {
          [id]: {
            metadata: metadata =>
              metadata.filter((value, key) => key !== index),
          },
        },
      }),

    [canvasReorderMetadataPair]: (state, { payload: { id, from, to } }) =>
      update(state, {
        list: {
          [id]: {
            metadata: reorderArray(from, to),
          },
        },
      }),

    [canvasUpdateRequiredStatement]: (
      state,
      { payload: { id, requiredStatement } }
    ) =>
      update(state, {
        list: {
          [id]: {
            requiredStatement: { $set: requiredStatement },
          },
        },
      }),
  },
  DEFAULT_STATE
);

export {
  createCanvas,
  removeCanvas,
  recoverCanvas,
  updateCanvasOrder,
  selectCanvas,
  canvasUpdateLabel,
  canvasUpdateSummary,
  canvasAddMetadataPair,
  canvasUpdateMetadataPair,
  canvasRemoveMetadataPair,
  canvasReorderMetadataPair,
  canvasUpdateRequiredStatement,
  reducer,
  DEFAULT_STATE,
  DEFAULT_CANVAS_STATE,
};
