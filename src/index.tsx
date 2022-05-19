import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createAndGetStore } from '@redux/redux';

(async function renderApp() {
  const store = await createAndGetStore();

  ReactDOM.render(
    <React.StrictMode>
      <App {...{ store }} />
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
