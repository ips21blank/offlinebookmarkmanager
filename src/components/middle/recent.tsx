import { DataNode, FolderColumnProps, RecPageData } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { useEffect, useState } from 'react';
import { FolderFullViewColumn } from './folderFullView/folder-full-view-column';

type T = (val: string) => void;

const StartEndIndices: React.FC<{
  //   inputVal: { i: string; c: string };
  //   setInputVal: ({ i, c }: { i: string; c: string }) => void;
  formI: string;
  formC: string;
  setFormI: T;
  setFormC: T;
  update: () => void;
  total: number;
}> = ({ formI, formC, setFormC, setFormI, total, update }) => {
  return (
    <div id="recent-setting">
      <label>Start :</label>
      <input
        type="text"
        value={formI}
        onChange={(e) => setFormI(e.target.value)}
      />
      <label>Count :</label>
      <input
        type="text"
        value={formC}
        onChange={(e) => setFormC(e.target.value)}
      />
      <button onClick={update}>Go</button>[ Total Bookmarks : {total}]
    </div>
  );
};

const Recent: React.FC<any> = (props) => {
  const [colCount, dispMode, allNodes, i01, count0] = useAppSelector(
    (state) => [
      state.displayState.noOfColumns,
      state.displayState.mode,
      state.bookmarks.db.recent,

      (state.displayState.pageData as RecPageData).i1,
      (state.displayState.pageData as RecPageData).count
    ]
  );
  const [nodes, setNodes] = useState([] as DataNode[]);

  const checkI = (i1: number, count: number) => {
    const n = allNodes.length;

    i1 = i1 >= 0 && i1 < n - 1 ? i1 : 0;
    count = count >= 1 ? count : 1;
    count = i1 + count <= n ? count : n - i1;

    return [i1, count];
  };

  const [i, c] = checkI(i01, count0);
  const [index, setIndex] = useState({ i, c });

  const [formI, setFormI] = useState(String(index.i + 1));
  const [formC, setFormC] = useState(String(index.c));

  const checkNum = (val: any) => (isNaN(parseInt(val)) ? 0 : parseInt(val));
  const setI = (iS: string, cS: string) => {
    let [i, c] = checkI(checkNum(iS) - 1, checkNum(cS));
    setIndex({ i, c });
  };

  const spliceNodes = () =>
    setNodes(allNodes.slice(index.i, index.c + index.i));
  useEffect(() => spliceNodes(), [index]);

  const update = () => setI(formI, formC);

  let colProps: FolderColumnProps[] = [];
  for (let colIndex = 1; colIndex <= colCount; colIndex++) {
    colProps.push({ nodes, colCount, colIndex, dispMode });
  }

  return (
    <div id="recent-page">
      <StartEndIndices
        {...{
          formI,
          formC,
          setFormI,
          setFormC,
          update,
          total: allNodes.length
        }}
      />
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

export { Recent };
