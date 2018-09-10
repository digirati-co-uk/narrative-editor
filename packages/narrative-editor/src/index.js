import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import presley from '@narrative-editor/presley';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

// import App from './containers/app/App';
import NarrativeEditor from './components/NarrativeEditor/NarrativeEditor';
import './index.css';

const { store, persistor } = presley();

if (process.env.NODE_ENV !== 'production') {
  console.log(`Running in development, React v${React.version}`);
}

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NarrativeEditor />
    </PersistGate>
  </Provider>,
  document.querySelector('#app')
);

require('./AnnotationStudio.scss');
