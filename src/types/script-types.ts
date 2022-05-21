interface SelectionState {
  readonly folCount: number;
  readonly bkmCount: number;
  readonly total: number;
  readonly folders: string[];
  readonly bookmarks: string[];

  addFol(id: string): boolean;
  addBkm(id: string): boolean;

  rmvFol(id: string): boolean;
  rmvBkm(id: string): boolean;

  hasFol(id: string): boolean;
  hasBkm(id: string): boolean;

  clear(): void;
}
type DataNode = chrome.bookmarks.BookmarkTreeNode;

interface NodeDetail extends DataNode {
  readonly urlLower: string;
  readonly titleLower: string;
}

interface NodeScoreData {
  node: DataNode;
  // fulLtag = 0;
  fulLfol: number;
  fulLnam: number;
  fulLurl: number;
  // parTtag : number;
  parTfol: number;
  parTnam: number;
  parTurl: number;
  score: number;
}

type SearchStats = { nBkm: number; nFol: number; duration: number };

type NodeSearchResult = {
  nodeScores: NodeScoreData[];
  resultId: number;
  parentNodeId: string;
  stats: SearchStats;
};

type IconData = { lower: string; upper: string };
type IconObj = { [k: string]: IconData };
type IconSaveData = { [k: string]: string };
interface BookmarkTree {
  bkms: Set<string>;
  fols: Set<string>;

  readonly baseNodeId: string;
  readonly baseNode: DataNode;
  readonly baseChildIds: string[];
  readonly allBkmArrCopy: DataNode[];

  readonly recent: DataNode[];

  // access
  get(id: string): DataNode | undefined;
  add(node: DataNode, i?: number): BookmarkTree;
  rmv(nodeId: string): BookmarkTree;
  mov(id: string, newParentId: string, index?: number): BookmarkTree;

  rnm(id: string, title: string): BookmarkTree;
  url(id: string, url: string): BookmarkTree;
  reorder(id: string, children: string[]): BookmarkTree;
  getAllChildren(id: string | undefined): DataNode[];
  getParentChain(id: string): DataNode[];
  addParentChains(nodes: DataNode[]): DataNode[];

  // search
  search(id: string, queryString: string): Promise<NodeSearchResult>;
  refreshSearch(): Promise<NodeSearchResult>;
  getCachedSrhResult(): Promise<NodeSearchResult>;
  getDuplicates(ignoreHash: boolean): Promise<DataNode[][]>;

  // icons
  setIconsData(icons: IconSaveData): any;
  getIconsSaveData(): IconSaveData;
  addToIcons(id: string): any;
  rmvFromIcons(id: string): any;
}

export type {
  SelectionState,
  DataNode,
  NodeDetail,
  NodeScoreData,
  SearchStats,
  BookmarkTree,
  NodeSearchResult,
  IconData,
  IconObj,
  IconSaveData
};
