import {
  SrhPageData,
  FolderColumnProps,
  DataNode,
  NodeScoreData,
  NodeSearchResult
} from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { refreshSrh } from '@redux/redux';
import { GLOBAL_SETTINGS } from '@scripts/globals';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FolderFullViewColumn } from './folderFullView/folder-full-view-column';

const SearchStats: React.FC<any> = (props) => {
  return <div id="search-stats">Stats</div>;
};

const SearchResultsPg: React.FC<any> = (props: any) => {
  const [nodes, setNodes] = useState([] as DataNode[]);
  const [resId, setResId] = useState(1);
  const dispatch = useDispatch();

  const [colCount, dispMode, locNode, resultPromise] = useAppSelector(
    (state) => {
      let data = state.displayState.pageData as SrhPageData;
      return [
        state.displayState.noOfColumns,
        state.displayState.mode,
        state.bookmarks.db.get(data.currLocation),
        state.bookmarks.searchPromise ||
          Promise.resolve({ nodeScores: [], resultId: 1 })
      ];
    }
  );

  useEffect(() => {
    let timeout: number;

    resultPromise.then((result: NodeSearchResult) => {
      if (!result.resultId) {
        // resultId 0 means invalidated.
        dispatch(refreshSrh());
      } else if (resId !== result.resultId) {
        timeout = setTimeout(() => {
          let orderedNodes = result.nodeScores.map((ns) => ns.node);

          setResId(result.resultId);
          setNodes([...orderedNodes]);
        }, GLOBAL_SETTINGS.srhDispDelay);
      }
    });

    return () => clearTimeout(timeout);
  });

  let colProps: FolderColumnProps[] = [];
  // prettier-ignore
  for (let colIndex = 1; colIndex <= colCount; colIndex++) {
    colProps.push({ nodes, colCount, colIndex, dispMode });
  }

  return (
    <div id="search-page">
      <SearchStats />
      <div className="folder-view-content">
        {nodes.length
          ? colProps.map((prop) => (
              <FolderFullViewColumn
                {...prop}
                key={`full-view-column-srh-${prop.colIndex}/${colCount}`}
              />
            ))
          : 'Loading...'}
      </div>
    </div>
  );
};

export { SearchResultsPg };
