import { useState } from 'react';
import { FolderFullViewProps } from '@proj-types/types';
import { FolderFullViewColumns } from './folder-full-view-columns';
import { useAppSelector } from '@redux/hooks';
import {
  BsCaretRightFill,
  BsCaretDownFill,
  BsFillPencilFill
} from '@components/icons';

const FolderFullView: React.FC<FolderFullViewProps> = ({ nodeId }) => {
  let classExp = 'folder-view expanded',
    classCol = 'folder-view collapsed';

  let [currClass, setCurrClass] = useState(classExp);

  let folder = useAppSelector((state) => state.bookmarks.get(nodeId));
  if (!folder) {
    return <div className={currClass}></div>;
  }
  let baseNodes = useAppSelector((state) => state.bookmarks.getBaseNodes());

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
        <div>
          <span className="btn-icon">
            {currClass === classExp ? (
              <BsCaretDownFill />
            ) : (
              <BsCaretRightFill />
            )}
          </span>
          <span>{folder.title}</span>
        </div>
        {baseNodes.indexOf(nodeId) === -1 ? (
          <span className="btn-icon">
            <BsFillPencilFill className="edit-icon" />
          </span>
        ) : (
          ''
        )}
      </div>
      <FolderFullViewColumns nodeId={nodeId} />
    </div>
  );
};
export { FolderFullView };
