import {
  ACTIONS,
  DataNode,
  DISP_MODES,
  FLOW_DIRECTION,
  FolderContentProps,
  NodeProps,
  ShowCtxMenu
} from '@proj-types/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder } from '@components/icons';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { FOLDER_CLASSES, CUSTOM_EVENTS } from '@scripts/globals';
import { TitleInput } from './title-input';
import { useDispatch } from 'react-redux';
import { showCtxMenu } from '@redux/redux';

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
  let [expColClass, setExpColClass]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(FOLDER_CLASSES.COL);
  const dispatch: (action: ShowCtxMenu) => any = useDispatch();
  let [editing, editTitle] = useState(false);

  let [initialized, setInitialized] = useState(false);
  let ref = useRef<HTMLElement>(null);

  const expandCollapse = () => {
    if (expColClass === FOLDER_CLASSES.COL) {
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
      showCtxMenu(ACTIONS.FOL_CONTEXT_MENU, {
        node: node,
        isCollapsed: expColClass === FOLDER_CLASSES.COL,
        rename: () => editTitle(true),
        expandCollapse: expandCollapse,
        x: e.clientX,
        y: e.clientY
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
      <BsFolder />
    </span>
  ) : (
    <></>
  );
  let titleInput = (
    <TitleInput
      id={node.id}
      title={node.title}
      doneEditing={() => {
        editTitle(false);
      }}
    />
  );

  useEffect(() => {
    DragEventHandlers.removeEventsFromNode(node.id);
    DragEventHandlers.addEventsToNode(
      node,
      direction,
      colIndex,
      colCount,
      dispMode
    );
  }); // , [node, direction, colIndex, colCount, dispMode]);

  return (
    <div className={'folder ' + expColClass}>
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
