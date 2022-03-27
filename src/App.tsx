import { Provider } from 'react-redux';

import { SideMenu } from '@components/leftSide/side-menu';
import { Middle } from '@components/middle/middle';
import { Aside } from '@components/rightSide/aside';

import { store } from '@redux/redux';
import { addListenersToBrowser } from '@scripts/browser/browser';
import { browserAPI } from '@scripts/browser/browser-api';
import { initialStateBkm } from '@redux/initial-states';
import './sass/style.scss';

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <SideMenu />
      <Middle />
      <Aside />
    </Provider>
  );
};

addListenersToBrowser();
(window as any).api = browserAPI;
(window as any).db = initialStateBkm.db;
