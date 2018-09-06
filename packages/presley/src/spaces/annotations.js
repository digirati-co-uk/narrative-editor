import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { reorderArray } from '../utility';

// Constants
const ADD_ANNOTATION = 'ADD_ANNOTATION';
const UPDATE_ANNOTATION = 'UPDATE_ANNOTATION';
const UPDATE_ANNOTATION_ORDER = 'UPDATE_ANNOTATION_ORDER';
const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION';
const RECOVER_ANNOTATION = 'RECOVER_ANNOTATION';

const DEFAULT_STATE = {
  order: [],
  list: {},
};

const {
  addAnnotation,
  updateAnnotation,
  updateAnnotationOrder,
  removeAnnotation,
  recoverAnnotation,
} = createActions({
  [ADD_ANNOTATION]: (id, annotation) => ({ id, annotation }),
  [UPDATE_ANNOTATION]: (id, annotation) => ({ id, annotation }),
  [UPDATE_ANNOTATION_ORDER]: (from, to) => ({ from, to }),
  [REMOVE_ANNOTATION]: annotationId => ({ annotationId }),
  [RECOVER_ANNOTATION]: annotationId => ({ annotationId }),
});

const reducer = handleActions(
  {
    [addAnnotation]: (state, { payload: { id, annotation } }) =>
      update(state, {
        order: { $push: [id] },
        list: {
          [id]: { $set: annotation },
        },
      }),

    [updateAnnotation]: (state, { payload: { id, annotation } }) =>
      update(state, {
        list: {
          [id]: { $set: annotation },
        },
      }),

    [updateAnnotationOrder]: (state, { payload: { from, to } }) =>
      update(state, {
        order: reorderArray(from, to),
      }),

    [removeAnnotation]: (state, { payload: { annotationId } }) =>
      update(state, {
        order: ids => ids.filter(id => id !== annotationId),
      }),

    [recoverAnnotation]: (state, { payload: { annotationId } }) =>
      state.list[annotationId]
        ? update(state, {
            order: { $push: [annotationId] },
          })
        : state,
  },
  DEFAULT_STATE
);

export {
  addAnnotation,
  updateAnnotation,
  updateAnnotationOrder,
  removeAnnotation,
  recoverAnnotation,
  reducer,
  DEFAULT_STATE,
};
