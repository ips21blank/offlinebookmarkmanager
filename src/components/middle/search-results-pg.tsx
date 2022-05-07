import {
  SrhPageData,
  FolderColumnProps,
  DataNode,
  NodeScoreData,
  NodeSearchResult
} from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { GLOBAL_SETTINGS } from '@scripts/globals';
import { useEffect, useState } from 'react';
import { FolderFullViewColumn } from './folderFullView/folder-full-view-column';

const SearchStats: React.FC<any> = (props) => {
  return <div id="search-stats">Stats</div>;
};

const SearchResultsPg: React.FC<any> = (props: any) => {
  const [nodes, setNodes] = useState([] as DataNode[]);
  const [resId, setResId] = useState(1);

  const [colCount, dispMode, loc, resultPromise] = useAppSelector((state) => {
    let data = state.displayState.pageData as SrhPageData;
    return [
      state.displayState.noOfColumns,
      state.displayState.mode,
      data.currLocation,
      state.bookmarks.orderedNodesPromise ||
        Promise.resolve({ nodeScores: [], resultId: 1 })
    ];
  });

  useEffect(() => {
    let timeout: number;
    resultPromise.then(
      (result: NodeSearchResult) =>
        (timeout = setTimeout(() => {
          let orderedNodes = result.nodeScores.map((ns) => ns.node);

          if (resId !== result.resultId) {
            setResId(result.resultId);
            setNodes(orderedNodes);
          }
        }, GLOBAL_SETTINGS.srhDispDelay))
    );

    return () => clearTimeout(timeout);
  });

  let colProps: FolderColumnProps[] = [];
  // prettier-ignore
  for (let colIndex = 1; colIndex <= colCount; colIndex++) {
    colProps.push({ nodes, colCount, colIndex, dispMode });
  }

  return (
    <div>
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
