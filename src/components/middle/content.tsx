import React, { useEffect } from 'react';
import { ContentProps, DataNode } from '@proj-types/types';
import { FolderFullView } from './folderFullView/folder-full-view';
import { useAppSelector } from '@redux/redux';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';

export const Content: React.FC<ContentProps> = (props) => {
  const folders = useAppSelector((state) => {
    let loc = state.displayState.currLocation;
    if (state.bookmarks.db.baseNodeId === loc) {
      return state.bookmarks.db.baseChildIds;
    }
    return (loc && [loc]) || [];
  });
  const nodesMoved = useAppSelector(
    (state) => state.displayState.elementsMoved
  );

  useEffect(() => {
    DragEventHandlers.highlightNodesMoved(nodesMoved);
  }, [nodesMoved]);

  return (
    <div id="content">
      {folders.map((fol) => (
        <FolderFullView nodeId={fol} key={'full-view-' + fol} />
      ))}
    </div>
  );
};
