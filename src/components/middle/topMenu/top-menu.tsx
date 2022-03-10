import React from 'react';
import { TopMenuProps } from '@proj-types/types';

import { TopMenuButtons } from './top-menu-buttons';
import { AddressBar } from './address-bar';

export const TopMenu: React.FC<TopMenuProps> = (props) => {
  return (
    <nav id="top-menu" className="inline-el-no-wrap-center">
      <AddressBar />
      <TopMenuButtons />
    </nav>
  );
};
