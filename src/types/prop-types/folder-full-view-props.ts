import { DataBase } from '@scripts/db';
import { DataNode } from '../browser-types';

/**
 * FULL FOLDER VIEW PROPS
 */
interface ContentProps {}

interface FolderFullViewProps {
  folder: DataNode;
  colCount: number;
}

interface folderColumnProps {
  nodes: DataNode[];
  index: number;
  colCount: number;
}

export type { ContentProps, FolderFullViewProps, folderColumnProps };
