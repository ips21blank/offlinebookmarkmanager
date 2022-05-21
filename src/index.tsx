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
import { TIMESTAMP } from '@scripts/globals';

(async function renderAppAndStartup() {
  const store = await createAndGetStore();

  ReactDOM.render(
    <React.StrictMode>
      <App {...{ store }} />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // Add code for firing and listning to custom events.
  addCustomDragEvents();

  // Add listeners to browser bookmark/storage/... events.
  addListenersToBrowser();

  // Timestamp for app started. If the following timpstamp.
  // does not match on storage changes, tab is closed.
  browserAPI.store({
    [TIMESTAMP.key]: TIMESTAMP.val
  });
  testFn();
})();
