import React, { useEffect } from 'react';
import { MiddleProps, PAGE_TYPE } from '@proj-types/types';
import { FolderContent } from './folder-content';
import { TopMenu } from './topMenu/top-menu';
import { useAppSelector } from '@redux/hooks';
import { SearchResultsPg } from './search-results-pg';
import { Recent } from './recent';
import { Duplicates } from './duplicates';
import { useDispatch } from 'react-redux';
import { showInfoPopup } from '@redux/redux';
import { NULL_NOTICE } from '@scripts/globals';

export const Middle: React.FC<MiddleProps> = (props) => {
  const [pageType, notice] = useAppSelector((state) => [
    state.displayState.pageType,
    state.displayState.notice
  ]);
  const dispatch = useDispatch();

  let content: JSX.Element;
  switch (pageType) {
    case PAGE_TYPE.FOL: {
      content = <FolderContent />;
      break;
    }
    case PAGE_TYPE.SRH: {
      content = <SearchResultsPg />;
      break;
    }
    case PAGE_TYPE.REC: {
      content = <Recent />;
      break;
    }
    case PAGE_TYPE.DUP: {
      content = <Duplicates />;
      break;
    }
    default:
      content = <FolderContent />;
  }

  useEffect(() => {
    if (notice && notice !== NULL_NOTICE) {
      dispatch(showInfoPopup({ title: 'Note', text: notice }));
    }
  }, [notice]);

  return (
    <div id="main">
      <TopMenu />

      <div id="content">
        <div id="content-container">{content}</div>
      </div>
    </div>
  );
};
