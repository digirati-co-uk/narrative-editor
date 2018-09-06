import * as tileSource from '../../src/spaces/tileSource';
import { createStore, combineReducers } from 'redux';

describe('spaces/tileSource', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({ tileSource: tileSource.reducer }));
  });

  test('tile source can be added', () => {
    store.dispatch(tileSource.changeTileSource({ test: 'tile source data' }));

    expect(store.getState()).toEqual({
      tileSource: { current: { test: 'tile source data' } },
    });
  });

  test('tile source can be updated without merged keys', () => {
    store.dispatch(tileSource.changeTileSource({ test: 'tile source data' }));
    store.dispatch(
      tileSource.changeTileSource({ test2: 'tile source data updated' })
    );

    expect(store.getState()).toEqual({
      tileSource: { current: { test2: 'tile source data updated' } },
    });
  });

  test('tile source can be removed', () => {
    store.dispatch(tileSource.changeTileSource({ test: 'tile source data' }));
    store.dispatch(tileSource.removeTileSource());

    expect(store.getState()).toEqual({
      tileSource: { current: null },
    });
  });
});
