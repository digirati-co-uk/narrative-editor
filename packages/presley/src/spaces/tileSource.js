/**
 * Note: This only supports one tile source at the moment.
 */
import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

// Constants.
const CHANGE_TILE_SOURCE = 'CHANGE_TILE_SOURCE';
const REMOVE_TILE_SOURCE = 'REMOVE_TILE_SOURCE';

const DEFAULT_STATE = {
  current: null,
};

const { changeTileSource, removeTileSource } = createActions({
  [CHANGE_TILE_SOURCE]: tileSource => ({ tileSource }),
  [REMOVE_TILE_SOURCE]: () => ({}),
});

const reducer = handleActions(
  {
    [changeTileSource]: (state, { payload: { tileSource } }) =>
      update(state, { current: { $set: tileSource } }),

    [removeTileSource]: state => update(state, { current: { $set: null } }),
  },
  DEFAULT_STATE
);

export { changeTileSource, removeTileSource, reducer, DEFAULT_STATE };
