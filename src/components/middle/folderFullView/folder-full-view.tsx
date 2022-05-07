import React, { useRef, useState } from 'react';
import { FolderFullViewProps } from '@proj-types/types';
import { FolderFullViewColumns } from './folder-full-view-columns';
import { useAppSelector } from '@redux/hooks';
import {
  BsCaretRightFill,
  BsCaretDownFill,
  BsFillPencilFill
} from '@components/icons';

const FolderTitle: React.FC<any> = ({ title, nodeId }) => {
  let ref = useRef<HTMLElement>(null);

  let titleProps = {
    // ref: ref
  };

  return <span {...titleProps}>{title}</span>;
};

const FolderFullView: React.FC<FolderFullViewProps> = ({ nodeId }) => {
  let classExp = 'folder-view expanded',
    classCol = 'folder-view collapsed';

  let [currClass, setCurrClass] = useState(classExp);

  let [folder, baseChildIds] = useAppSelector((state) => [
    state.bookmarks.db.get(nodeId),
    state.bookmarks.db.baseChildIds
  ]);
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

  let expColIcon = (
    <span className="btn-icon">
      {currClass === classExp ? <BsCaretDownFill /> : <BsCaretRightFill />}
    </span>
  );

  return (
    <div className={currClass}>
      <div className="folder-view-title" onClick={expandCollapseFullViewFolder}>
        <div>
          {expColIcon}
          <FolderTitle title={folder.title} nodeId={nodeId} />
        </div>
        {/* {baseChildIds.indexOf(nodeId) === -1 ? (
          <span className="btn-icon" onClick={(e) => e.stopPropagation()}>
            <BsFillPencilFill className="edit-icon" />
          </span>
        ) : (
          ''
        )} */}
      </div>
      <FolderFullViewColumns nodeId={nodeId} />
    </div>
  );
};
export { FolderFullView };
