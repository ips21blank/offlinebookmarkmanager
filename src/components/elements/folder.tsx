import { NodeProps } from "../../types";

const Folder: React.FC<NodeProps> = ({ node }) => {
  return <div className="folder">{node.title}</div>;
};

export { Folder };
