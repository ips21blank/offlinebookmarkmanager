type DataNode = chrome.bookmarks.BookmarkTreeNode;
type FlowDirection = "row" | "column";

interface SideMenuProps {}
interface AsideProps {}
interface TopMenuProps {
  parentChain: DataNode[];
}
interface MiddleProps {}

interface AddressBarProps extends TopMenuProps {}
interface TopMenuButtonsProps {}
interface SearchAndReloadProps {}
interface TopMenuEditButtonsProps {}

interface NodeProps {
  node: DataNode;
}
interface FolderFullViewProps {
  folder: DataNode;
  colCount: number;
  direction: FlowDirection;
}
interface folderColumnProps {
  nodes: DataNode[];
  index: number;
  colCount: number;
  direction: FlowDirection;
}

export {
  DataNode,
  SideMenuProps,
  AsideProps,
  TopMenuProps,
  MiddleProps,
  AddressBarProps,
  TopMenuButtonsProps,
  SearchAndReloadProps,
  TopMenuEditButtonsProps,
  NodeProps,
  FolderFullViewProps,
  folderColumnProps,
};
