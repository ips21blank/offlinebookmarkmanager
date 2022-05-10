import {
  DataNode,
  FolderColumnProps,
  FolPageData,
  NodeProps
} from '@proj-types/types';
import { Bookmark } from '@components/middle/elements/bookmark';
import { Folder } from '@components/middle/elements/folder';
import { useAppSelector } from '@redux/hooks';
import { Utilities } from '@scripts/utilities';
import { ACCORDION_CLASSES } from '@scripts/globals';

const FolderFullViewColumn: React.FC<FolderColumnProps> = ({
  nodes,
  colIndex,
  colCount,
  dispMode
}) => {
  let [showIcon, direction] = useAppSelector((state) => [
    state.settings.showFolBkmIcons,
    state.settings.flowDirection
  ]);

  let className: string = `${ACCORDION_CLASSES.folCol} col-1-${colCount}`;
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
