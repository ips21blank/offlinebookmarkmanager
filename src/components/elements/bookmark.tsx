import { NodeProps } from '@proj-types/types';
import { getBkmIconSrc } from '@scripts/browser';

const Bookmark: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="bookmark">
      <a href={node.url}>
        <img src={getBkmIconSrc(node.url)} />
        {node.title || node.url}
      </a>
    </div>
  );
};

export { Bookmark };
