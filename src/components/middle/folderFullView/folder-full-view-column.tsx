import { DataNode, FolderColumnProps } from '@proj-types/types';
import { Bookmark } from '@components/middle/elements/bookmark';
import { Folder } from '@components/middle/elements/folder';
import { FLOW_DIRECTION } from '@proj-types/settings-types';
import { useAppSelector } from '@redux/hooks';
import { Utilities } from '@scripts/utilities';

const FolderFullViewColumn: React.FC<FolderColumnProps> = ({
  nodes,
  index,
  colCount
}) => {
  let showIcon = useAppSelector((state) => state.settings.showFolBkmIcons);
  let flowDir = useAppSelector((state) => state.settings.flowDirection);
  let className: string = `folder-view-column col-1-${colCount}`;
  nodes = Utilities.getNodeListForFol(flowDir, nodes, index, colCount);

  return (
    <div className={className}>
      {nodes.map((node: DataNode) => {
        let nodeProps = {
          node: node,
          showIcon: showIcon,
          direction: flowDir,
          key: `node-${node.id}`,
          colIndex: index,
          colCount: colCount
        };

        return node.url ? (
          <Bookmark {...nodeProps} />
        ) : (
          <Folder {...nodeProps} />
        );
      })}
    </div>
  );
};

export { FolderFullViewColumn };
