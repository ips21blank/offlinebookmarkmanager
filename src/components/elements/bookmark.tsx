import { NodeProps } from "../../types";

const Bookmark: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="bookmark">
      <a href={node.url}>{node.title || "No TITLE"}</a>
    </div>
  );
};

export { Bookmark };
