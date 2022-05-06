import React from 'react';
import { MiddleProps, PAGE_TYPE } from '@proj-types/types';
import { FolderContent } from './folder-content';
import { TopMenu } from './topMenu/top-menu';
import { useAppSelector } from '@redux/hooks';
import { SearchResults } from './search-results';

export const Middle: React.FC<MiddleProps> = (props) => {
  let content: JSX.Element;
  const pageType = useAppSelector((state) => state.displayState.pageType);

  switch (pageType) {
    case PAGE_TYPE.FOL: {
      content = <FolderContent />;
      break;
    }
    case PAGE_TYPE.SRH: {
      content = <SearchResults />;
      break;
    }
    default:
      content = <FolderContent />;
  }

  return (
    <div id="main">
      <TopMenu />

      <div id="content">{content}</div>
    </div>
  );
};
