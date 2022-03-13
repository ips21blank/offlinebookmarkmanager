import { FLOW_DIRECTION } from '@proj-types/settings-types';
import { DataNode } from '../browser-types';

/**
 * FOLDER AND BOOKMARK PROPS
 */
interface NodeProps {
  node: DataNode;
  showIcon: boolean;
  direction: FLOW_DIRECTION;
  colIndex: number;
  colCount: number;
}

interface FolderContentProps {
  children: DataNode[] | undefined;
  initialized: boolean;
}

export type { NodeProps, FolderContentProps };
