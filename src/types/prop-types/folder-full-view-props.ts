import { DISP_MODES } from '@proj-types/types';
import { DataNode } from '../redux/bookmark-types-actions';

/**
 * FULL FOLDER VIEW PROPS
 */
interface ContentProps {}

interface FolderFullViewProps {
  nodeId: string;
}

interface FolderColumnsProps {
  nodeId: string;
}

interface FolderColumnProps {
  nodes: DataNode[];
  colIndex: number;
  colCount: number;
  dispMode: DISP_MODES;
}

export type {
  ContentProps,
  FolderFullViewProps,
  FolderColumnProps,
  FolderColumnsProps
};
