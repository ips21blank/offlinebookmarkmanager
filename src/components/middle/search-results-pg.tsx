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
import { Utilities } from '@scripts/utilities';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FolderFullViewColumn } from './folderFullView/folder-full-view-column';

const dummyStats = { nBkm: 0, nFol: 0, duration: 0 };

type N = number;
const SearchStats: React.FC<{
  nBkm: N;
  nFol: N;
  nBkmTot: N;
  nFolTot: N;
  duration: N;
}> = ({ nBkm, nFol, nBkmTot, nFolTot, duration }) => {
  return (
    <div id="search-stats">
      {`Searched ${nFolTot} folders and ${nBkmTot} bookmarks in `}
      {`${duration} milliseconds.`}
      <br />
      {`Found ${nFol} folders and ${nBkm} bookmarks.`}
    </div>
  );
};

const SearchResultsPg: React.FC<any> = (props: any) => {
  const [nodes, setNodes] = useState([] as DataNode[]);
  const [resId, setResId] = useState(1);
  const [stats, setStats] = useState(dummyStats);
  const dispatch = useDispatch();

  const [colCount, dispMode, currLoc, resultPromise, nBkmTot, nFolTot] =
    useAppSelector((state) => {
      let data = state.displayState.pageData as SrhPageData;
      let locNode = state.bookmarks.db.get(data.currLocation);

      let { nBkm, nFol } = Utilities.countNodeChildren(locNode);

      return [
        state.displayState.noOfColumns,
        state.displayState.mode,
        locNode && locNode.id,
        state.bookmarks.searchPromise ||
          Promise.resolve({
            nodeScores: [],
            resultId: 1,
            parentNodeId: '',
            stats: dummyStats
          }),
        nBkm,
        nFol
      ];
    });

  useEffect(() => {
    let timeout: number;

    resultPromise.then((result: NodeSearchResult) => {
      if (!result.resultId) {
        // resultId 0 means invalidated.
        dispatch(refreshSrh());
      } else if (resId !== result.resultId && currLoc === result.parentNodeId) {
        timeout = setTimeout(() => {
          let orderedNodes = result.nodeScores.map((ns) => ns.node);

          setResId(result.resultId);
          setNodes([...orderedNodes]);
          setStats(result.stats);
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
      <SearchStats {...{ ...stats, nBkmTot, nFolTot }} />
      <div className="folder-view-content">
        {nodes.length
          ? colProps.map((prop) => (
              <FolderFullViewColumn
                {...prop}
                key={`full-view-column-srh-${prop.colIndex}/${colCount}`}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export { SearchResultsPg };
