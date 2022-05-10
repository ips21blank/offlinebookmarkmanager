import React, { useEffect, useState } from 'react';
import { ContentProps, FolPageData } from '@proj-types/types';
import { FolderFullView } from './folderFullView/folder-full-view';
import { useAppSelector } from '@redux/redux';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { SELECT_CLASS } from '@scripts/globals';
import { Utilities } from '@scripts/utilities';

export const FolderContent: React.FC<ContentProps> = (props) => {
  const [folders, nodesMoved, showNodeChain] = useAppSelector((state) => {
    let loc: string =
      (state.displayState.pageData as FolPageData).currLocation ||
      state.bookmarks.db.baseNodeId;
    let folderIds: string[];

    let showParentChain =
      (state.displayState.pageData as FolPageData).showNode &&
      state.bookmarks.db.getParentChain(
        (state.displayState.pageData as FolPageData).showNode
      );

    let showNodeChain = [] as string[];
    if (showParentChain) {
      showNodeChain = showParentChain.map((node) => node.id);
      showNodeChain.pop(); // remove root id.
      showNodeChain.pop(); // remove base node id.
      showNodeChain.reverse();
    }

    if (state.bookmarks.db.baseNodeId === loc) {
      folderIds = state.bookmarks.db.baseChildIds;
    } else {
      folderIds = (loc && [loc]) || [];
    }

    return [folderIds, state.displayState.elementsMoved, showNodeChain];
  });

  useEffect(() => {
    DragEventHandlers.highlightNodesMoved(nodesMoved);
  }, [nodesMoved]);

  let [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (showNodeChain.length) {
      let i = 0;
      while (i < showNodeChain.length - 1) {
        if (!document.getElementById(showNodeChain[i + 1])) {
          document.getElementById(showNodeChain[i])?.click();
          setRerender(!rerender);
          return;
        }
        i++;
      }
      Utilities.showNode(document.getElementById(showNodeChain[i]));
    }
  });

  return (
    <>
      {folders.map((fol) => (
        <FolderFullView nodeId={fol} key={'full-view-' + fol} />
      ))}
    </>
  );
};
