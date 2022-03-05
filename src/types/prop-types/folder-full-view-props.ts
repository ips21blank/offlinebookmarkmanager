import { DataNode } from '../browser-types';

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
  index: number;
  colCount: number;
}

export type {
  ContentProps,
  FolderFullViewProps,
  FolderColumnProps,
  FolderColumnsProps
};
