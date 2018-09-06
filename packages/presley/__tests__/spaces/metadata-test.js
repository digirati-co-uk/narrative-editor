import * as metadata from '../../src/spaces/metadata';
import { createStore, combineReducers } from 'redux';

describe('spaces/metadata', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({ metadata: metadata.reducer }));
  });

  test('it can update label', () => {
    store.dispatch(metadata.updateLabel('Testing new label'));
    expect(store.getState()).toEqual({
      metadata: {
        label: 'Testing new label',
        metadata: [],
        requiredStatement: null,
        summary: null,
      },
    });
  });

  test('it can update required statement', () => {
    store.dispatch(metadata.updateRequiredStatement('Some required statement'));
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [],
        requiredStatement: 'Some required statement',
        summary: null,
      },
    });
  });

  test('it can update summary', () => {
    store.dispatch(metadata.updateSummary('Some summary'));
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [],
        requiredStatement: null,
        summary: 'Some summary',
      },
    });
  });

  test('it can add single metadata pair', () => {
    store.dispatch(metadata.addMetadataPair('test label', 'test value'));
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [{ label: 'test label', value: 'test value' }],
        requiredStatement: null,
        summary: null,
      },
    });
  });

  test('it can add multiple metadata pairs', () => {
    store.dispatch(metadata.addMetadataPair('test label 1', 'test value 1'));
    store.dispatch(metadata.addMetadataPair('test label 2', 'test value 2'));
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [
          { label: 'test label 1', value: 'test value 1' },
          { label: 'test label 2', value: 'test value 2' },
        ],
        requiredStatement: null,
        summary: null,
      },
    });
  });

  test('it can update metadata pairs', () => {
    store.dispatch(metadata.addMetadataPair('test label 1', 'test value 1'));
    store.dispatch(metadata.addMetadataPair('test label 2', 'test value 2'));
    store.dispatch(metadata.addMetadataPair('test label 3', 'test value 3'));

    store.dispatch(
      metadata.updateMetadataPair(1, 'changed label 2', 'changed value 2')
    );

    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [
          { label: 'test label 1', value: 'test value 1' },
          { label: 'changed label 2', value: 'changed value 2' },
          { label: 'test label 3', value: 'test value 3' },
        ],
        requiredStatement: null,
        summary: null,
      },
    });
  });

  test('it can add reorder multiple metadata pairs', () => {
    store.dispatch(metadata.addMetadataPair('test label 1', 'test value 1'));
    store.dispatch(metadata.addMetadataPair('test label 2', 'test value 2'));
    store.dispatch(metadata.addMetadataPair('test label 3', 'test value 3'));
    store.dispatch(metadata.reorderMetadataPair(0, 2)); // position 0 -> position 2, so 2, 3, 1
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [
          { label: 'test label 2', value: 'test value 2' },
          { label: 'test label 3', value: 'test value 3' },
          { label: 'test label 1', value: 'test value 1' },
        ],
        requiredStatement: null,
        summary: null,
      },
    });
  });

  test('it can remove metadata pair at index', () => {
    store.dispatch(metadata.addMetadataPair('test label 1', 'test value 1'));
    store.dispatch(metadata.addMetadataPair('test label 2', 'test value 2'));
    store.dispatch(metadata.addMetadataPair('test label 3', 'test value 3'));
    store.dispatch(metadata.removeMetadataPair(0));
    expect(store.getState()).toEqual({
      metadata: {
        label: null,
        metadata: [
          { label: 'test label 2', value: 'test value 2' },
          { label: 'test label 3', value: 'test value 3' },
        ],
        requiredStatement: null,
        summary: null,
      },
    });
  });
});
