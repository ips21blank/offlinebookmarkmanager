import { useState } from 'react';
import {
  DataNode,
  FolderFullViewProps,
  folderColumnProps
} from '@proj-types/types';
import { FolderFullViewColumn } from './folderFullViewColumn';

const FolderFullView: React.FC<FolderFullViewProps> = ({
  folder,
  colCount
}) => {
  const ch = folder.children || ([] as DataNode[]);

  let colProps: folderColumnProps[] = [];

  for (let i = 0; i < colCount; i++) {
    // create children array for each column separately.
    colProps.push({
      nodes: ch,
      index: i,
      colCount: colCount
    });
  }

  let classExp = 'folder-view expanded',
    classCol = 'folder-view collapsed';

  let [currClass, setCurrClass] = useState(classExp);

  const expandCollapseFullViewFolder = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (/collapsed/.test(currClass)) {
      setCurrClass(classExp);
    } else {
      setCurrClass(classCol);
    }
  };

  return (
    <div className={currClass}>
      <div className="folder-view-title" onClick={expandCollapseFullViewFolder}>
        {folder.title}
      </div>
      <div className="folder-view-content">
        {colProps.map((prop) => (
          <FolderFullViewColumn key={prop.index + String(colCount)} {...prop} />
        ))}
      </div>
    </div>
  );
};
export { FolderFullView };
