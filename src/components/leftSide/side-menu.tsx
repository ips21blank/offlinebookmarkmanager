import React from 'react';
import { SideMenuProps } from '@proj-types/types';
import { PinnedFolder } from './pinned-folder';

export const SideMenu: React.FC<SideMenuProps> = (props) => {
  return (
    <nav id="side-menu">
      <div id="fixed-btn">
        <span className="inline-el-no-wrap-center">Btn 1</span>
        <span className="inline-el-no-wrap-center">Btn 2</span>
        <span className="inline-el-no-wrap-center">Btn 3</span>
      </div>
      <span id="pin-fol-tip">Drop folders here.</span>
      <div id="pinned-folders">
        <PinnedFolder targetId="" isHomeLoc={false} title="PIN 1" />
        <PinnedFolder targetId="" isHomeLoc={false} title="PIN 2" />
        <PinnedFolder targetId="" isHomeLoc={false} title="PIN 3" />
        <PinnedFolder targetId="" isHomeLoc={false} title="PIN 4" />
        <PinnedFolder targetId="" isHomeLoc={false} title="PIN 5" />
      </div>
    </nav>
  );
};
