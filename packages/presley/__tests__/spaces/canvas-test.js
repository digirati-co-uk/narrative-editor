import * as canvas from '../../src/spaces/canvas';
import { createStore, combineReducers } from 'redux';

describe('spaces/canvas', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({ canvas: canvas.reducer }));
  });

  test('canvas can be created', () => {
    store.dispatch(canvas.createCanvas('id-123'));

    expect(store.getState()).toMatchSnapshot();
  });

  test('multiple canvases can be created', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.createCanvas('id-2'));

    expect(store.getState()).toMatchSnapshot();
  });

  test('canvas can be removed', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.createCanvas('id-2'));
    store.dispatch(canvas.createCanvas('id-3'));

    store.dispatch(canvas.removeCanvas('id-2'));

    expect(store.getState()).toMatchSnapshot();
  });

  test('canvas can be recovered', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.createCanvas('id-2'));
    store.dispatch(canvas.createCanvas('id-3'));

    store.dispatch(canvas.removeCanvas('id-2'));
    store.dispatch(canvas.recoverCanvas('id-2'));

    expect(store.getState()).toMatchSnapshot();
  });

  test('canvas that does not exist cannot be recovered', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.removeCanvas('id-1'));

    store.dispatch(canvas.recoverCanvas('id-2'));

    expect(store.getState()).toMatchSnapshot();
  });

  test('current canvas can be removed', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.removeCanvas('id-1'));

    expect(store.getState().canvas.current).toEqual(null);
  });

  test('canvas can be selected manually', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.createCanvas('id-2'));
    store.dispatch(canvas.createCanvas('id-3'));
    store.dispatch(canvas.selectCanvas('id-2'));

    expect(store.getState().canvas.current).toEqual('id-2');
  });

  test('canvas order can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.createCanvas('id-2'));
    store.dispatch(canvas.createCanvas('id-3'));

    store.dispatch(canvas.updateCanvasOrder(2, 1));

    expect(store.getState().canvas.order).toEqual(['id-1', 'id-3', 'id-2']);
  });

  test('canvas label can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.canvasUpdateLabel('id-1', 'Some test label'));

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: 'Some test label',
            metadata: [],
            requiredStatement: null,
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas summary can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(canvas.canvasUpdateSummary('id-1', 'Test summary'));

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [],
            requiredStatement: null,
            summary: 'Test summary',
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas metadata pair can be added', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label', 'test value')
    );

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [{ label: 'Test label', value: 'test value' }],
            requiredStatement: null,
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas metadata pair can be removed', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 1', 'test value 1')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 2', 'test value 2')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 3', 'test value 3')
    );
    store.dispatch(canvas.canvasRemoveMetadataPair('id-1', 1));

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [
              { label: 'Test label 1', value: 'test value 1' },
              { label: 'Test label 3', value: 'test value 3' },
            ],
            requiredStatement: null,
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas metadata pair can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 1', 'test value 1')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 2', 'test value 2')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 3', 'test value 3')
    );
    store.dispatch(
      canvas.canvasUpdateMetadataPair(
        'id-1',
        1,
        'Test label 2 change',
        'Test value 2 changed'
      )
    );

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [
              { label: 'Test label 1', value: 'test value 1' },
              { label: 'Test label 2 change', value: 'Test value 2 changed' },
              { label: 'Test label 3', value: 'test value 3' },
            ],
            requiredStatement: null,
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas metadata pair order can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 1', 'test value 1')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 2', 'test value 2')
    );
    store.dispatch(
      canvas.canvasAddMetadataPair('id-1', 'Test label 3', 'test value 3')
    );
    store.dispatch(canvas.canvasReorderMetadataPair('id-1', 1, 0));

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [
              { label: 'Test label 2', value: 'test value 2' },
              { label: 'Test label 1', value: 'test value 1' },
              { label: 'Test label 3', value: 'test value 3' },
            ],
            requiredStatement: null,
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });

  test('canvas required statement can be updated', () => {
    store.dispatch(canvas.createCanvas('id-1'));
    store.dispatch(
      canvas.canvasUpdateRequiredStatement('id-1', 'Some required statement')
    );

    expect(store.getState()).toEqual({
      canvas: {
        current: 'id-1',
        list: {
          'id-1': {
            id: 'id-1',
            label: null,
            metadata: [],
            requiredStatement: 'Some required statement',
            summary: null,
          },
        },
        order: ['id-1'],
      },
    });
  });
});
