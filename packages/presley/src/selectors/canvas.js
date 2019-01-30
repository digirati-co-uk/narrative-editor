import { createSelector, createStructuredSelector } from 'reselect';

export const currentCanvasId = state => state.canvas.current;
export const canvasList = state => state.canvas.list;
export const currentCanvas = createSelector(
  currentCanvasId,
  canvasList,
  (id, list) => (id ? list[id] : null)
);

export const getLabel = createSelector(currentCanvas, canvas => canvas.label);
export const getSummary = createSelector(
  currentCanvas,
  canvas => canvas.summary
);
export const getMetadata = createSelector(
  currentCanvas,
  canvas => canvas.metadata
);
export const getRequiredStatement = createSelector(
  currentCanvas,
  canvas => canvas.requiredStatement
);
export const getId = createSelector(currentCanvas, canvas => canvas.id);
