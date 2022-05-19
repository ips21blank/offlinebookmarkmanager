import React, { useEffect, useRef, useState } from 'react';
import { FolderFullViewProps } from '@proj-types/types';
import { FolderFullViewColumns } from './folder-full-view-columns';
import { useAppSelector } from '@redux/hooks';
import {
  BsCaretRightFill,
  BsCaretDownFill,
  BsFillPencilFill
} from '@components/icons';
import { Utilities } from '@scripts/utilities';
import { FOLDER_CLASSES } from '@scripts/globals';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { AddFolBtn } from './add-fol-btn';

const FolderTitle: React.FC<any> = ({ title }) => {
  // let ref = useRef<HTMLElement>(null);

  let titleProps = {
    // ref: ref
  };

  return <span {...titleProps}>{title}</span>;
};

const FolderFullView: React.FC<FolderFullViewProps> = ({ nodeId }) => {
  let classExp = 'folder-view expanded',
    classCol = 'folder-view collapsed';

  let [currClass, setCurrClass] = useState(classExp);

  let [folder, isHomeOrBase] = useAppSelector((state) => {
    let homeOrBase = [
      ...state.bookmarks.db.baseChildIds,
      state.bookmarks.db.baseNodeId
    ];

    return [
      state.bookmarks.db.get(nodeId),
      true || homeOrBase.includes(nodeId)
    ];
  });
  useEffect(() => {
    DragEventHandlers.addEventsToFullViewTitle(nodeId);
  });

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
      {isHomeOrBase ? (
        <div
          className={FOLDER_CLASSES.FUL_TITLE}
          onClick={expandCollapseFullViewFolder}
          id={Utilities.getFolderFullViewId(nodeId)}
        >
          <div>
            {expColIcon}
            <FolderTitle title={folder.title} />
          </div>
          {/* {baseChildIds.indexOf(nodeId) === -1 ? (
          <span className="btn-icon" onClick={(e) => e.stopPropagation()}>
            <BsFillPencilFill className="edit-icon" />
          </span>
        ) : (
          ''
        )} */}
          <AddFolBtn folId={nodeId} />
        </div>
      ) : (
        ''
      )}
      <FolderFullViewColumns nodeId={nodeId} />
    </div>
  );
};
export { FolderFullView };
