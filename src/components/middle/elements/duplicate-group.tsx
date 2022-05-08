import { DataNode } from '@proj-types/script-types';

const DuplicateNode: React.FC<{
  node: DataNode;
  addRmvNode: (id: string, val: boolean) => void;
}> = ({ node, addRmvNode }) => {
  return (
    <div className="duplicate-node">
      <input
        type="checkbox"
        id={node.id}
        onChange={(e) => {
          addRmvNode(node.id, e.target.checked);
        }}
      />
      {node.title}
    </div>
  );
};

const DuplicateGroup: React.FC<{
  nodes: DataNode[];
  addRmvNode: (id: string, val: boolean) => void;
}> = ({ nodes, addRmvNode }) => {
  return (
    <div className="duplicates-group">
      {nodes.map((node) => (
        <DuplicateNode {...{ node, addRmvNode }} key={`dup-nod-${node.id}`} />
      ))}
    </div>
  );
};

export { DuplicateGroup };
