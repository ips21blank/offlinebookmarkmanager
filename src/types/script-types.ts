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

type NodeSearchResult = { nodeScores: NodeScoreData[]; resultId: number };

interface BookmarkTree {
  bkms: Set<string>;
  fols: Set<string>;

  readonly baseNodeId: string;
  readonly baseNode: DataNode;
  readonly baseChildIds: string[];
  readonly allBkmArrCopy: DataNode[];

  readonly recent: DataNode[];

  get(id: string): DataNode | undefined;
  add(node: DataNode, i?: number): BookmarkTree;

  rmv(nodeId: string): BookmarkTree;
  getAllChildren(id: string | undefined): DataNode[];
  mov(id: string, newParentId: string, index?: number): BookmarkTree;
  rnm(id: string, title: string): BookmarkTree;
  url(id: string, url: string): BookmarkTree;
  getParentChain(id: string): DataNode[];
  addParentChains(nodes: DataNode[]): DataNode[];
  reorder(id: string, children: string[]): BookmarkTree;

  search(id: string, queryString: string): Promise<NodeSearchResult>;
  refreshSearch(): Promise<NodeSearchResult>;
  getCachedSrhResult(): Promise<NodeSearchResult>;
  getDuplicates(ignoreHash: boolean): Promise<DataNode[][]>;
}

export type {
  SelectionState,
  DataNode,
  NodeDetail,
  NodeScoreData,
  BookmarkTree,
  NodeSearchResult
};
