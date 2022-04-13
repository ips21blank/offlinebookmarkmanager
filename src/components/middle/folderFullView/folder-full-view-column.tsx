import { DataNode, FolderColumnProps, NodeProps } from '@proj-types/types';
import { Bookmark } from '@components/middle/elements/bookmark';
import { Folder } from '@components/middle/elements/folder';
import { FLOW_DIRECTION } from '@proj-types/settings-types-actions';
import { useAppSelector } from '@redux/hooks';
import { Utilities } from '@scripts/utilities';

const FolderFullViewColumn: React.FC<FolderColumnProps> = ({
  nodes,
  colIndex,
  colCount,
  dispMode
}) => {
  let showIcon = useAppSelector((state) => state.settings.showFolBkmIcons);
  let direction = useAppSelector((state) => state.settings.flowDirection);
  let className: string = `folder-view-column col-1-${colCount}`;
  nodes = Utilities.getNodeListForFol(direction, nodes, colIndex, colCount);

  return (
    <div className={className}>
      {nodes.map((node: DataNode) => {
        let nodeProps: NodeProps = {
            node,
            showIcon,
            direction,
            colIndex,
            colCount,
            dispMode
          },
          key = `node-${node.id}`;

        return node.url ? (
          <Bookmark {...nodeProps} key={key} />
        ) : (
          <Folder {...nodeProps} key={key} />
        );
      })}
    </div>
  );
};

export { FolderFullViewColumn };
