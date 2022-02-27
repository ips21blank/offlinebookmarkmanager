import React from 'react';
import { TopMenuProps } from '@proj-types/types';

import { TopMenuButtons } from './topMenuButtons';
import { AddressBar } from './addressBar';

export const TopMenu: React.FC<TopMenuProps> = (props) => {
  return (
    <nav id="top-menu">
      <AddressBar {...props} />
      <TopMenuButtons />
    </nav>
  );
};
