import { createSelector } from 'reselect';

export const getAnnotationOrder = state => state.annotations.order;
export const getAnnotationIndex = state => state.annotations.list;

export const getAnnotations = createSelector(
  getAnnotationOrder,
  getAnnotationIndex,
  (ids, annotations) => ids.map(id => annotations[id])
);
