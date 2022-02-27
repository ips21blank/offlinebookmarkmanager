import { DataNode, folderColumnProps } from '@proj-types/types';
import { Bookmark } from '../elements/bookmark';
import { Folder } from '../elements/folder';
import { FlowDirection, SETTINGS } from '@scripts/settings';

const getNodeListCol = (
  nodes: DataNode[],
  n: number,
  i: number
): DataNode[] => {
  return nodes;
};
const getNodeListRow = (
  nodes: DataNode[],
  n: number,
  i: number
): DataNode[] => {
  return nodes;
};

const FolderFullViewColumn: React.FC<folderColumnProps> = ({
  nodes,
  index,
  colCount
}) => {
  colCount = colCount < 6 ? colCount : 6;

  if (SETTINGS.direction === FlowDirection.ROW) {
    nodes = getNodeListRow(nodes, colCount, index);
  } else {
    // direction == "column"
    nodes = getNodeListCol(nodes, colCount, index);
  }

  let className: string = `folder-view-column col-1-${colCount}`;
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
