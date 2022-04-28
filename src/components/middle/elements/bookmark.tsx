import { useEffect, useRef, useState } from 'react';
import { ACTIONS, NodeProps, ShowCtxMenu } from '@proj-types/types';
import { browserAPI } from '@scripts/browser/browser-api';
import { BsLink45Deg } from '@components/icons';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { useDispatch } from 'react-redux';
import { showCtxMenu } from '@redux/redux';
import { TitleInput } from './title-input';
import { BKM_CLASSES } from '@scripts/globals';

const Bookmark: React.FC<NodeProps> = ({
  node,
  showIcon,
  direction,
  colIndex,
  colCount,
  dispMode
}) => {
  let [editing, editTitle] = useState(false);
  let [err, setErr] = useState(false);
  const dispatch: (action: ShowCtxMenu) => any = useDispatch();
  let img =
    err && showIcon ? (
      <BsLink45Deg />
    ) : (
      <img
        src={browserAPI.getBkmIconSrc(node.url)}
        onError={() => setErr(true)}
      />
    );

  const contextMenuHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    // window.dispatchEvent(CUSTOM_EVENTS.nodeCtxMenu);

    dispatch(
      showCtxMenu({
        node: node,
        rename: () => editTitle(true),
        x: e.clientX,
        y: e.clientY
      })
    );
  };

  // let ref = useRef<HTMLAnchorElement>(null);
  let bkmLinkProps = {
    // ref: ref,
    href: node.url,
    className: `inline-el-no-wrap-center ${BKM_CLASSES.BKM}`,
    id: node.id,
    onContextMenu: contextMenuHandler
  };

  useEffect(() => {
    // Done by Garbage collector.
    // DragEventHandlers.removeEventsFromNode(node.id);
    DragEventHandlers.addEventsToNode(
      node,
      direction,
      colIndex,
      colCount,
      dispMode
    );
  }); // , [node, direction, colIndex, colCount, dispMode]);

  return (
    <a {...bkmLinkProps} onClick={(e) => editing && e.preventDefault()}>
      {img}
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
