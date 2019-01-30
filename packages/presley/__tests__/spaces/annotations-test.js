import * as annotations from '../../src/spaces/annotations';
import { createStore, combineReducers } from 'redux';

describe('spaces/annotations', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({ annotations: annotations.reducer }));
  });

  test('annotation can be added', () => {
    store.dispatch(
      annotations.addAnnotation('id-123', {
        '@id': 'id-123',
        label: 'my-annotation',
      })
    );

    expect(store.getState()).toEqual({
      annotations: {
        list: { 'id-123': { '@id': 'id-123', label: 'my-annotation' } },
        order: ['id-123'],
      },
    });
  });

  test('multiple annotations can be added in order', () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Test annotation 2',
      })
    );

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Test annotation 2' },
        },
        order: ['id-1', 'id-2'],
      },
    });
  });

  test('annotations can be removed (and not deleted)', () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Test annotation 2',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-3', {
        '@id': 'id-3',
        label: 'Test annotation 3',
      })
    );

    store.dispatch(annotations.removeAnnotation('id-2'));

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Test annotation 2' },
          'id-3': { '@id': 'id-3', label: 'Test annotation 3' },
        },
        order: ['id-1', 'id-3'],
      },
    });

    store.dispatch(annotations.removeAnnotation('id-1'));

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Test annotation 2' },
          'id-3': { '@id': 'id-3', label: 'Test annotation 3' },
        },
        order: ['id-3'],
      },
    });
  });

  test('removed annotations can be recovered', () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Test annotation 2',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-3', {
        '@id': 'id-3',
        label: 'Test annotation 3',
      })
    );

    store.dispatch(annotations.removeAnnotation('id-2'));

    store.dispatch(annotations.recoverAnnotation('id-2'));

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Test annotation 2' },
          'id-3': { '@id': 'id-3', label: 'Test annotation 3' },
        },
        order: ['id-1', 'id-3', 'id-2'],
      },
    });
  });

  test("annotations that don't exist, can't be recovered", () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(annotations.removeAnnotation('id-1'));
    store.dispatch(annotations.recoverAnnotation('id-2'));

    expect(store.getState()).toEqual({
      annotations: {
        list: { 'id-1': { '@id': 'id-1', label: 'Test annotation 1' } },
        order: [],
      },
    });
  });

  test('annotations can be reordered', () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Test annotation 2',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-3', {
        '@id': 'id-3',
        label: 'Test annotation 3',
      })
    );

    store.dispatch(annotations.updateAnnotationOrder(1, 0));

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Test annotation 2' },
          'id-3': { '@id': 'id-3', label: 'Test annotation 3' },
        },
        order: ['id-2', 'id-1', 'id-3'],
      },
    });
  });

  test('annotations can be updated', () => {
    store.dispatch(
      annotations.addAnnotation('id-1', {
        '@id': 'id-1',
        label: 'Test annotation 1',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Test annotation 2',
      })
    );
    store.dispatch(
      annotations.addAnnotation('id-3', {
        '@id': 'id-3',
        label: 'Test annotation 3',
      })
    );

    store.dispatch(
      annotations.updateAnnotation('id-2', {
        '@id': 'id-2',
        label: 'Updated label 2',
      })
    );

    expect(store.getState()).toEqual({
      annotations: {
        list: {
          'id-1': { '@id': 'id-1', label: 'Test annotation 1' },
          'id-2': { '@id': 'id-2', label: 'Updated label 2' },
          'id-3': { '@id': 'id-3', label: 'Test annotation 3' },
        },
        order: ['id-1', 'id-2', 'id-3'],
      },
    });
  });
});
