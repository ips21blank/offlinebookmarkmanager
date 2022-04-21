import React, { useEffect } from 'react';
import { ContentProps, DataNode } from '@proj-types/types';
import { FolderFullView } from './folderFullView/folder-full-view';
import { useAppSelector } from '@redux/redux';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';

export const Content: React.FC<ContentProps> = (props) => {
  const [folders, nodesMoved] = useAppSelector((state) => {
    let loc = state.displayState.currLocation;
    let folderIds: string[];

    if (state.bookmarks.db.baseNodeId === loc) {
      folderIds = state.bookmarks.db.baseChildIds;
    } else {
      folderIds = (loc && [loc]) || [];
    }

    return [folderIds, state.displayState.elementsMoved];
  });

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
