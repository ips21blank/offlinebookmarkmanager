import { useEffect, useRef, useState } from 'react';
import { NodeProps } from '@proj-types/types';
import { browserAPI } from '@scripts/browser-api';
import { BsLink45Deg } from '@components/icons';
import { DragEventHandlers } from '@scripts/drag-handlers';

const Bookmark: React.FC<NodeProps> = ({
  node,
  showIcon,
  direction,
  colIndex,
  colCount
}) => {
  let [err, setErr] = useState(false);
  let img =
    err && showIcon ? (
      <BsLink45Deg />
    ) : (
      <img
        src={browserAPI.getBkmIconSrc(node.url)}
        onError={() => setErr(true)}
      />
    );

  let ref = useRef<HTMLAnchorElement>(null);
  let bkmLinkProps = {
    ref: ref,
    href: node.url,
    className: 'inline-el-no-wrap-center bookmark',
    id: node.id
  };

  useEffect(() => {
    DragEventHandlers.removeEventsFromNode(node.id);
    DragEventHandlers.addEventsToNode(node, direction, colIndex, colCount);
  }, [node, colIndex, colCount]);

  return (
    <a {...bkmLinkProps}>
      {img}
      {node.title || node.url}
    </a>
  );
};

export { Bookmark };
