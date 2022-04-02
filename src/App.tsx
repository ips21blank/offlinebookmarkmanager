import { Provider } from 'react-redux';

import { SideMenu } from '@components/leftSide/side-menu';
import { Middle } from '@components/middle/middle';
import { Aside } from '@components/rightSide/aside';

import { store } from '@redux/redux';
import { addListenersToBrowser } from '@scripts/browser/browser';
import { browserAPI } from '@scripts/browser/browser-api';
import { addCustomDragEvents } from '@scripts/drag/custom-drag-events';
import { initialStateBkm } from '@redux/initial-states';
import './sass/style.scss';
import { DragEl } from '@components/middle/drag-element';
import { Overlay } from '@components/overlay/overlay';

import { testFn } from '@scripts/test';

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <SideMenu />
      <Middle />
      <Aside />
      <DragEl />
      <Overlay />
    </Provider>
  );
};

addCustomDragEvents();
addListenersToBrowser();
(window as any).api = browserAPI;
(window as any).db = initialStateBkm.db;
testFn();
