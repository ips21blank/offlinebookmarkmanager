import React from 'react';
import { MiddleProps, PAGE_TYPE } from '@proj-types/types';
import { FolderContent } from './folder-content';
import { TopMenu } from './topMenu/top-menu';
import { useAppSelector } from '@redux/hooks';

export const Middle: React.FC<MiddleProps> = (props) => {
  let content: JSX.Element;
  const pageType = useAppSelector((state) => state.displayState.pageType);

  switch (pageType) {
    case PAGE_TYPE.FOL: {
      content = <FolderContent />;
      break;
    }
    default:
      content = <FolderContent />;
  }

  return (
    <div id="main">
      <TopMenu />
      {content}
    </div>
  );
};
