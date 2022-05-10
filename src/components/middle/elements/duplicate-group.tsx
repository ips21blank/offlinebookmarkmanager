import { DataNode } from '@proj-types/script-types';
import { BkmIco } from './bookmark-icon';

const DuplicateNodeLink: React.FC<{ node: DataNode; showIcon: boolean }> = ({
  node,
  showIcon
}) => {
  return (
    <a href={node.url} className="duplicate-node-link">
      <BkmIco url={node.url || ''} showIcon={showIcon} />
      {node.title}
    </a>
  );
};
const DuplicateNodeParentChain: React.FC<{ parents: DataNode[] }> = ({
  parents
}) => {
  let parentChain: string = '';
  if (parents.length > 2) {
    parentChain = parents[parents.length - 2].title;
    for (let i = parents.length - 3; i > 0; i--) {
      parentChain += ' >> ' + parents[i].title;
    }
  }

  return <span className="parent-chain">{parentChain}</span>;
};

const DuplicateNode: React.FC<{
  node: DataNode;
  addRmvNode: (id: string, val: boolean) => void;
  showIcon: boolean;
}> = ({ node, addRmvNode, showIcon }) => {
  return (
    <div className="duplicate-node">
      <input
        type="checkbox"
        id={node.id}
        onChange={(e) => {
          addRmvNode(node.id, e.target.checked);
        }}
      />
      <DuplicateNodeParentChain parents={(node as any).parentChain} /> ::
      <DuplicateNodeLink {...{ node, showIcon }} />
    </div>
  );
};

const DuplicateGroup: React.FC<{
  nodes: DataNode[];
  addRmvNode: (id: string, val: boolean) => void;
  showIcon: boolean;
}> = ({ nodes, addRmvNode, showIcon }) => {
  return (
    <div className="duplicates-group">
      {nodes.map((node) => (
        <DuplicateNode
          {...{ node, addRmvNode, showIcon }}
          key={`dup-nod-${node.id}`}
        />
      ))}
    </div>
  );
};

export { DuplicateGroup };
