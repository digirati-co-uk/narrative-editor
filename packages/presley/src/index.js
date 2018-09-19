import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reduxReset from 'redux-reset';
import reducers from './reducers';
import * as annotations from './spaces/annotations';
import * as metadata from './spaces/metadata';
import * as tileSource from './spaces/tileSource';
import * as canvas from './spaces/canvas';
import { RESET, reset } from './spaces/reset';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: 'root',
  storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createCustomStore(
  customReducers = {},
  extraMiddleware = [],
  defaultState = {}
) {
  const store = createStore(
    persistReducer(persistConfig, combineReducers(reducers)),
    defaultState,
    composeEnhancers(applyMiddleware(...extraMiddleware), reduxReset(RESET))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}

export { annotations, metadata, tileSource, canvas, reset };
