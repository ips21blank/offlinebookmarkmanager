import { useState } from 'react';
import { FolderFullViewProps } from '@proj-types/types';
import { FolderFullViewColumns } from './folderFullViewColumns';
import { useAppSelector } from '@redux/hooks';

const FolderFullView: React.FC<FolderFullViewProps> = ({ nodeId }) => {
  let classExp = 'folder-view expanded',
    classCol = 'folder-view collapsed';

  let [currClass, setCurrClass] = useState(classExp);

  let folder = useAppSelector((state) => state.bookmarks.get(nodeId));
  if (!folder) {
    return <div className={currClass}></div>;
  }

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
      <FolderFullViewColumns nodeId={nodeId} />
    </div>
  );
};
export { FolderFullView };
