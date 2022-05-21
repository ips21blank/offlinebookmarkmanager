import './sass/style.scss';
import { Provider } from 'react-redux';

import { SideMenu } from '@components/leftSide/side-menu';
import { Middle } from '@components/middle/middle';
import { Aside } from '@components/rightSide/aside';
import { DragEl } from '@components/middle/elements/drag-element';
import { Overlay } from '@components/overlay/overlay';

import { StoreType } from '@proj-types/types';

export const App: React.FC<{ store: StoreType }> = ({ store }) => {
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
