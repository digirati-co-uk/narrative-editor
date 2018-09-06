import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducers from './reducers';
import * as annotations from './spaces/annotations';
import * as metadata from './spaces/metadata';
import * as tileSource from './spaces/tileSource';
import * as canvas from './spaces/canvas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createCustomStore(
  customReducers = {},
  extraMiddleware = [],
  defaultState = {}
) {
  return createStore(
    combineReducers(reducers),
    defaultState,
    composeEnhancers(applyMiddleware(...extraMiddleware))
  );
}

export { annotations, metadata, tileSource, canvas };
