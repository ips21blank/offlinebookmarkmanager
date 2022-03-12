import { DataNode } from '../browser-types';

/**
 * FOLDER AND BOOKMARK PROPS
 */
interface NodeProps {
  node: DataNode;
  showIcon: boolean;
}

interface FolderContentProps {
  children: DataNode[] | undefined;
  initialized: boolean;
}

export type { NodeProps, FolderContentProps };
