import { DataNode, FolderColumnProps } from '@proj-types/types';
import { Bookmark } from '../elements/bookmark';
import { Folder } from '../elements/folder';
import { FLOW_DIRECTION } from '@proj-types/settings-types';
import { useAppSelector } from '@redux/hooks';
import { Utilities } from '@scripts/utilities';

const FolderFullViewColumn: React.FC<FolderColumnProps> = ({
  nodes,
  index,
  colCount
}) => {
  let flowDir: FLOW_DIRECTION = useAppSelector(
    (state) => state.settings.flowDirection
  );
  let className: string = `folder-view-column col-1-${colCount}`;
  nodes = Utilities.getNodeListForFol(flowDir, nodes, index, colCount);

  return (
    <div className={className}>
      {nodes.map((node: DataNode) => {
        if (node.url) {
          return <Bookmark key={node.id} node={node} />;
        } else {
          return <Folder key={node.id} node={node} />;
        }
      })}
    </div>
  );
};

export { FolderFullViewColumn };
