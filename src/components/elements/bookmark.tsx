import { NodeProps } from '@proj-types/types';

const Bookmark: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="bookmark">
      <a href={node.url}>{node.title || node.url}</a>
    </div>
  );
};

export { Bookmark };
