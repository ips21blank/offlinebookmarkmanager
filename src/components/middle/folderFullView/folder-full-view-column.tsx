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
  let [flowDir, minRowsPerCol]: [FLOW_DIRECTION, number] = useAppSelector(
    (state) => [state.settings.flowDirection, state.settings.minRowsPerCol]
  );
  let className: string = `folder-view-column col-1-${colCount}`;
  nodes = Utilities.getNodeListForFol(
    flowDir,
    nodes,
    index,
    colCount,
    minRowsPerCol
  );

  return (
    <div className={className}>
      {nodes.map((node: DataNode) => {
        if (node.url) {
          return <Bookmark key={node.id} node={node} showIcon={showIcon} />;
        } else {
          return <Folder key={node.id} node={node} showIcon={showIcon} />;
        }
      })}
    </div>
  );
};

export { FolderFullViewColumn };
