import { useState } from 'react';
import { NodeProps } from '@proj-types/types';
import { getBkmIconSrc } from '@scripts/browser';
import { BsLink45Deg } from '@components/icons';

const Bookmark: React.FC<NodeProps> = ({ node }) => {
  let [err, setErr] = useState(false);

  return (
    <div className="bookmark">
      <a href={node.url} className="inline-el-no-wrap-center">
        {err ? (
          <BsLink45Deg />
        ) : (
          <img src={getBkmIconSrc(node.url)} onError={() => setErr(true)} />
        )}
        {node.title || node.url}
      </a>
    </div>
  );
};

export { Bookmark };
