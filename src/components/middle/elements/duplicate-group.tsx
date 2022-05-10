import { DataNode } from '@proj-types/script-types';
import { useState } from 'react';
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
  nodeAndSel: [DataNode, boolean];
  addRmvNode: (id: string, val: boolean) => void;
  showIcon: boolean;
}> = ({ nodeAndSel, addRmvNode, showIcon }) => {
  return (
    <div className="duplicate-node">
      <input
        type="checkbox"
        id={nodeAndSel[0].id}
        onChange={(e) => {
          addRmvNode(nodeAndSel[0].id, e.target.checked);
        }}
        checked={nodeAndSel[1]}
      />
      <DuplicateNodeParentChain parents={(nodeAndSel[0] as any).parentChain} />{' '}
      ::
      <DuplicateNodeLink {...{ node: nodeAndSel[0], showIcon }} />
    </div>
  );
};

const DuplicateGroup: React.FC<{
  nodesAndSel: [DataNode, boolean][];
  addRmvNode: (id: string, val: boolean) => void;
  showIcon: boolean;
}> = ({ nodesAndSel, addRmvNode, showIcon }) => {
  return (
    <div className="duplicates-group">
      {nodesAndSel.map((nodeAndSel) => (
        <DuplicateNode
          {...{ nodeAndSel, addRmvNode, showIcon }}
          key={`dup-nod-${nodeAndSel[0].id}`}
        />
      ))}
    </div>
  );
};

export { DuplicateGroup };
