import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createAndGetStore } from '@redux/redux';
import {
  addListenersToBrowser,
  browserAPI,
  addCustomDragEvents,
  testFn
} from '@scripts/scripts';
import { initialStateBkm } from '@redux/initial-states';

(async function renderApp() {
  const store = await createAndGetStore();

  ReactDOM.render(
    <React.StrictMode>
      <App {...{ store }} />
    </React.StrictMode>,
    document.getElementById('root')
  );

  addCustomDragEvents();
  addListenersToBrowser();
  (window as any).api = browserAPI;
  (window as any).db = initialStateBkm.db;
  testFn();
})();
