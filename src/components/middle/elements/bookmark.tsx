import React, { useEffect, useRef, useState } from 'react';
import {
  CtxMenuTypes,
  NodeProps,
  ShowCtxMenu,
  ShowPopup
} from '@proj-types/types';
import { DragEventHandlers, Utilities } from '@scripts/scripts';
import { BKM_CLASSES } from '@scripts/globals';
import { useDispatch } from 'react-redux';
import { showCtxMenu, showInfoPopup } from '@redux/redux';
import { TitleInput } from './title-input';
import { BkmIco } from './bookmark-icon';

const Bookmark: React.FC<NodeProps> = ({
  node,
  showIcon,
  direction,
  colIndex,
  colCount,
  dispMode
}) => {
  let [editing, editTitle] = useState(false);
  let ref = useRef<HTMLAnchorElement>(null);

  const dispatch: (action: ShowCtxMenu | ShowPopup) => any = useDispatch();

  const contextMenuHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (node.url && Utilities.isLocalLink(node.url)) return;

    e.stopPropagation();
    e.preventDefault();
    // window.dispatchEvent(CUSTOM_EVENTS.nodeCtxMenu);

    dispatch(
      showCtxMenu({
        node: node,
        rename: () => editTitle(true),
        x: e.clientX,
        y: e.clientY,
        type: CtxMenuTypes.BKM_CTX_MENU
      })
    );
  };

  let bkmLinkProps = {
    ref: ref,
    href: node.url,
    className: `inline-el-no-wrap-center ${BKM_CLASSES.BKM}`,
    id: node.id,
    onContextMenu: contextMenuHandler
  };

  useEffect(() => {
    // Done by Garbage collector.
    // DragEventHandlers.removeEventsFromNode(node.id);
    // prettier-ignore
    DragEventHandlers.addEventsToNode(
      node, direction, colIndex, colCount, dispMode);
  }); // , [node, direction, colIndex, colCount, dispMode]);

  const clickHandler = (e: React.MouseEvent) => {
    if (editing) {
      e.preventDefault();
      return;
    }

    if (node.url && Utilities.isLocalLink(node.url)) {
      dispatch(
        showInfoPopup({
          title: "Can't open that",
          text:
            'Chrome does not allow opening local links from extensions.' +
            'You can right click and copy link addresses though.'
        })
      );
    }
  };

  return (
    <a {...bkmLinkProps} onClick={clickHandler}>
      <BkmIco {...{ url: node.url || '', showIcon }} />
      {editing ? (
        <TitleInput
          id={node.id}
          title={node.title}
          doneEditing={() => editTitle(false)}
        />
      ) : (
        node.title || node.url
      )}
    </a>
  );
};

export { Bookmark };
