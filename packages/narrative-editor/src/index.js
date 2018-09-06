import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import presley from '@narrative-editor/presley';

// import App from './containers/app/App';
import NarrativeEditor from './components/NarrativeEditor/NarrativeEditor';
import './index.css';

render(
  <Provider store={presley()}>
    <NarrativeEditor />
  </Provider>,
  document.querySelector('#app')
);
