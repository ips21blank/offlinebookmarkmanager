import {
  DataNode,
  DISP_MODES,
  FLOW_DIRECTION,
  FolderContentProps,
  NodeProps
} from '@proj-types/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder } from '@components/icons';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/drag-handlers';

const states = {
  EXP: 'expanded',
  COL: 'collapsed'
};

const FolderContent: React.FC<FolderContentProps> = ({
  children,
  initialized,
  dispMode
}) => {
  // Does not cause performance issues that much, becuase the hook is used
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
  ] = useState(states.COL);
  let [initialized, setInitialized] = useState(false);

  const expandColSubFol = () => {
    if (dispMode === DISP_MODES.EDIT) return;

    if (expColClass === states.COL) {
      setExpColClass(states.EXP);
      setInitialized(true);
    } else {
      setExpColClass(states.COL);
    }
  };
  let ref = useRef<HTMLElement>(null);

  let folderProps = {
    ref: ref,
    className: 'inline-el-no-wrap-center',
    id: node.id,
    onClick: expandColSubFol
  };

  let icon = showIcon ? (
    <span className="folder-icon">
      <BsFolder />
    </span>
  ) : (
    <></>
  );

  useEffect(() => {
    // DragEventHandlers.removeEventsFromNode(node.id);
    DragEventHandlers.addEventsToNode(
      node,
      direction,
      colIndex,
      colCount,
      dispMode
    );
  }, [node, colIndex, colCount]);

  return (
    <div className={'folder ' + expColClass}>
      <span {...folderProps}>
        {/* Because of performance issues there is an option for following. */}
        {icon}
        {node.title}
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
