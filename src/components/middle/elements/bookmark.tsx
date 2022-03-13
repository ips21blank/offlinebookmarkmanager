import { useRef, useState } from 'react';
import { NodeProps } from '@proj-types/types';
import { getBkmIconSrc } from '@scripts/browser';
import { BsLink45Deg } from '@components/icons';
import { DRAGTYPE } from '@scripts/globals';
import { DragMgr } from '@scripts/drag-manager';

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
      <img src={getBkmIconSrc(node.url)} onError={() => setErr(true)} />
    );

  let ref = useRef<HTMLAnchorElement>(null);
  let bkmLinkProps = {
    ref: ref,
    href: node.url,
    className: 'inline-el-no-wrap-center',
    id: node.id,
    draggable: true,
    onDragStart: (e: React.DragEvent<HTMLAnchorElement>) =>
      DragMgr.onDragStart(e, node.id, DRAGTYPE.BKM, ref.current),
    onDragEnd: (e: React.DragEvent<HTMLAnchorElement>) => {
      DragMgr.onDragEnd(e, ref.current);
    }
  };

  return (
    <div
      className="bookmark"
      onDragOver={(e: React.DragEvent<HTMLElement>) =>
        DragMgr.onDragoverNode(
          e,
          direction,
          ref.current,
          node,
          colIndex,
          colCount
        )
      }
      onDrop={DragMgr.onDrop}
      onDragLeave={DragMgr.onDragLeave}
    >
      <a {...bkmLinkProps}>
        {img}
        {node.title || node.url}
      </a>
    </div>
  );
};

export { Bookmark };
