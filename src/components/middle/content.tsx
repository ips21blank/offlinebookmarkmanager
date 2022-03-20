import React from 'react';
import { ContentProps, DataNode } from '@proj-types/types';
import { FolderFullView } from './folderFullView/folder-full-view';
import { DragMultipleEl } from './drag-element';
import { useAppSelector } from '@redux/redux';

export const Content: React.FC<ContentProps> = (props) => {
  let folders = useAppSelector((state) => {
    let loc = state.displayState.currLocation;
    if (state.bookmarks.db.baseNodeId === loc) {
      return state.bookmarks.db.baseChildIds;
    }
    return (loc && [loc]) || [];
  });

  return (
    <div id="content">
      {folders.map((fol) => (
        <FolderFullView nodeId={fol} key={'full-view-' + fol} />
      ))}
      <DragMultipleEl />
    </div>
  );
};
