import { DISP_MODES, FLOW_DIRECTION } from '@proj-types/types';
import { DataNode } from '../script-types';

/**
 * FOLDER AND BOOKMARK PROPS
 */
interface NodeProps {
  node: DataNode;
  showIcon: boolean;
  direction: FLOW_DIRECTION;
  colIndex: number;
  colCount: number;
  dispMode: DISP_MODES;
}

interface FolderContentProps {
  children: DataNode[] | undefined;
  initialized: boolean;
  dispMode: DISP_MODES;
}

export type { NodeProps, FolderContentProps };
