import { DataNode, folderColumnProps } from "../../types";
import { Bookmark } from "../elements/bookmark";
import { Folder } from "../elements/folder";

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
  colCount,
  direction,
}) => {
  if (direction === "row") {
    nodes = getNodeListRow(nodes, colCount, index);
  } else {
    // direction == "column"
    nodes = getNodeListCol(nodes, colCount, index);
  }

  let className: string = `folder-view-column`; // column-${colCount}`;
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
