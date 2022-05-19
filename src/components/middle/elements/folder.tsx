import {
  ACTIONS,
  CtxMenuTypes,
  DataNode,
  DISP_MODES,
  FLOW_DIRECTION,
  FolderContentProps,
  NodeProps,
  ShowCtxMenu
} from '@proj-types/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder, BsFolder2Open } from '@components/icons';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import {
  FOLDER_CLASSES,
  CUSTOM_EVENTS,
  FOL_RENAME_STR
} from '@scripts/globals';
import { TitleInput } from './title-input';
import { useDispatch } from 'react-redux';
import { showCtxMenu } from '@redux/redux';
import { Utilities } from '@scripts/utilities';

// Following 2 components are in same file because they both use each other.

const FolderContent: React.FC<FolderContentProps> = ({
  children,
  initialized,
  dispMode
}) => {
  // Should not cause performance issues that much, becuase the hook is used
  // in folder-content containers. Not in nodes (folders and bookmarks).
  let showIcon = useAppSelector((state) => state.settings.showFolBkmIcons);

  const mapChildrenToProps = (child: DataNode) => {
    let props: NodeProps = {
        node: child,
        showIcon: showIcon,
        direction: FLOW_DIRECTION.COLUMN,
        dispMode: dispMode,
        colIndex: 1,
        colCount: 1 // THIS IS USED TO FIND NEXT AND PREV COLs.
      },
      key = `node-${child.id}`;

    return child.url ? (
      <Bookmark {...props} key={key} />
    ) : (
      <Folder {...props} key={key} />
    );
  };

  return (
    <div className={'folder-children'}>
      {initialized && children ? children.map(mapChildrenToProps) : ''}
    </div>
  );
};

const Folder: React.FC<NodeProps> = ({
  node,
  showIcon,
  direction,
  colIndex,
  colCount,
  dispMode
}) => {
  const [expColClass, setExpColClass]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(FOLDER_CLASSES.COL);
  const dispatch: (action: ShowCtxMenu) => any = useDispatch();
  const [editing, editTitle] = useState(node.title === FOL_RENAME_STR);

  const [initialized, setInitialized] = useState(false);
  let ref = useRef<HTMLElement>(null);
  const isCollapsed = expColClass === FOLDER_CLASSES.COL;

  const expandCollapse = () => {
    if (isCollapsed) {
      setExpColClass(FOLDER_CLASSES.EXP);
      setInitialized(true);
    } else {
      setExpColClass(FOLDER_CLASSES.COL);
    }
  };
  const expandColSubFol = () => {
    if (editing) return;
    if (ref.current && ref.current.classList.contains(FOLDER_CLASSES.NO_EXP)) {
      ref.current.classList.remove(FOLDER_CLASSES.NO_EXP);
      return;
    }

    if (dispMode === DISP_MODES.EDIT) return;
    expandCollapse();
  };

  const contextMenuHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    // window.dispatchEvent(CUSTOM_EVENTS.nodeCtxMenu);

    dispatch(
      showCtxMenu({
        node: node,
        isCollapsed,
        rename: () => editTitle(true),
        expandCollapse: expandCollapse,
        x: e.clientX,
        y: e.clientY,
        type: CtxMenuTypes.FOL_CTX_MENU
      })
    );
  };

  let folderProps = {
    ref: ref,
    className: 'inline-el-no-wrap-center',
    id: node.id,
    onClick: expandColSubFol,
    onContextMenu: contextMenuHandler
  };

  let icon = showIcon ? (
    <span className="folder-icon">
      {isCollapsed ? <BsFolder /> : <BsFolder2Open />}
    </span>
  ) : (
    <></>
  );
  let titleInput = (
    <TitleInput
      id={node.id}
      title={node.title === FOL_RENAME_STR ? 'New Folder' : node.title}
      doneEditing={() => editTitle(false)}
    />
  );

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
    <div className={`${FOLDER_CLASSES.FOL} ` + expColClass}>
      <span {...folderProps}>
        {/* Because of performance issues there is an option for following. */}
        {icon}
        {editing ? titleInput : node.title}
      </span>
      <FolderContent
        children={node.children}
        initialized={initialized}
        dispMode={dispMode}
      />
    </div>
  );
};

export { Folder };
