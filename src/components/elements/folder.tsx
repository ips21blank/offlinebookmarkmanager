import { NodeProps } from '@proj-types/types';

const Folder: React.FC<NodeProps> = ({ node }) => {
  return <div className="folder">{node.title}</div>;
};

export { Folder };
