import { createSelector } from 'reselect';

export const currentTileSource = state => state.tileSource.current;

export const getHeight = createSelector(
  currentTileSource,
  tileSource => tileSource.height
);
export const getWidth = createSelector(
  currentTileSource,
  tileSource => tileSource.width
);
