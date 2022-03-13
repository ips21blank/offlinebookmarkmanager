import {
  DataNode,
  FLOW_DIRECTION,
  FolderContentProps,
  NodeProps
} from '@proj-types/types';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder } from '@components/icons';
import { useAppSelector } from '@redux/hooks';
import { DRAGTYPE } from '@scripts/globals';
import { DragMgr } from '@scripts/drag-manager';

const states = {
  EXP: 'expanded',
  COL: 'collapsed'
};

const FolderContent: React.FC<FolderContentProps> = ({
  children,
  initialized
}) => {
  // Does not cause performance issues that much, becuase the hook is used
  // in folder-content containers. Not in nodes (folders and bookmarks).
  let showIcon = useAppSelector((state) => state.settings.showFolBkmIcons);
  const mapChildrenToProps = (child: DataNode) => {
    let props = {
      node: child,
      showIcon: showIcon,
      direction: FLOW_DIRECTION.COLUMN,
      key: `node-${child.id}`,
      colIndex: 1,
      colCount: 1 // THIS IS USED TO FIND NEXT AND PREV COLs.
    };

    return child.url ? <Bookmark {...props} /> : <Folder {...props} />;
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
  colCount
}) => {
  let [expColClass, setExpColClass]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(states.COL);
  let [initialized, setInitialized] = useState(false);

  const expandColSubFol = () => {
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
    onClick: expandColSubFol,
    draggable: true,
    onDragStart: (e: React.DragEvent<HTMLElement>) =>
      DragMgr.onDragStart(e, node.id, DRAGTYPE.FOL, ref.current),
    onDragEnd: (e: React.DragEvent<HTMLAnchorElement>) => {
      DragMgr.onDragEnd(e, ref.current);
    }
  };

  let icon = showIcon ? (
    <span className="folder-icon">
      <BsFolder />
    </span>
  ) : (
    <></>
  );

  return (
    <div
      className={'folder ' + expColClass}
      onDragOver={(e: React.DragEvent<HTMLElement>) =>
        DragMgr.onDragoverNode(
          e,
          direction,
          ref.current,
          node,
          colIndex,
          colCount
        )
      }
      onDrop={DragMgr.onDrop}
      onDragLeave={DragMgr.onDragLeave}
    >
      <span {...folderProps}>
        {/* Because of performance issues there is an option for following. */}
        {icon}
        {node.title}
      </span>
      <FolderContent children={node.children} initialized={initialized} />
    </div>
  );
};

export { Folder };
