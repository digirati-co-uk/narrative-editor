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

export const getImageService = createSelector(currentTileSource, tileSource => {
  const service = Array.isArray(tileSource.service)
    ? tileSource.service[0]
    : tileSource.service;

  return service && (service['@id'] || service.id)
    ? service['@id'] || service.id
    : null;
});
