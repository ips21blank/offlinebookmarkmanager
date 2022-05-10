import { DataNode, BookmarkTree, NodeSearchResult } from '@proj-types/types';
import { SearchResult } from './search-result';

// prettier-ignore
interface SearchCacheId { id: string; q: string; }
class SearchCache implements SearchCacheId {
  constructor(
    public result: SearchResult,
    public id: string,
    public q: string,
    public resultId = 0
  ) {}

  public isSameAs(sr: SearchCacheId): boolean {
    return this.id === sr.id && this.q === sr.q;
  }
}

class DataBase implements BookmarkTree {
  public bkms: Set<string>; // Ids of bookmarks.
  public fols: Set<string>; // Ids of folders.
  private _nodes: Map<string, DataNode>; // data objects for nodes.
  private _baseNodeId: string;
  private _baseNode: DataNode;
  private _baseChildIds: string[];

  private _searchCache: SearchCache = new SearchCache(
    new SearchResult(),
    '',
    '',
    0
  );

  constructor(treeNode: DataNode) {
    let bkms: string[] = [],
      fols: string[] = [],
      _nodes: [string, DataNode][] = [];

    this._baseNode = treeNode;
    this._baseNodeId = treeNode.id;
    this._baseChildIds =
      (treeNode.children && treeNode.children.map((ch) => ch.id)) || [];

    const addNode = (n: DataNode): void => {
      _nodes.push([n.id, n]);
      Boolean(n.url) ? bkms.push(n.id) : fols.push(n.id);
    };

    let recurseNodeChildren = (node: DataNode): void => {
      if (!node.children?.length) return;

      let n: DataNode;
      for (let i = 0; i < node.children?.length; i++) {
        n = node.children[i];
        addNode(n);
        n.children?.length ? recurseNodeChildren(n) : 1;
      }
    };

    addNode(treeNode);
    recurseNodeChildren(treeNode);

    this.bkms = new Set<string>(bkms); // Ids of bookmarks.
    this.fols = new Set<string>(fols); // Ids of folders.
    this._nodes = new Map<string, DataNode>(_nodes); // data objects for nodes.
  }

  // Implementation details : methods for edits after initialization.
  private _add(node: DataNode): Map<string, DataNode> {
    return this._nodes.set(node.id, node);
  }
  private _rmv(id: string): boolean {
    return this._nodes.delete(id);
  }
  private _addId(id: string, isBkm: boolean): void {
    isBkm ? this.bkms.add(id) : this.fols.add(id);
  }
  private _rmvId(id: string, isBkm: boolean): void {
    isBkm ? this.bkms.delete(id) : this.fols.delete(id);
  }

  private _shiftChildIndices(ch: DataNode[], startI: number, change: number) {
    let chI: DataNode;
    for (let i = startI; i < ch.length; i++) {
      chI = ch[i];
      if (chI.index || chI.index === 0) chI.index += change;
    }
  }
  private _addChildToChildrenArr(child: DataNode, parentId: string): void {
    let p = this.get(parentId);
    if (!p || !p.children || !child) return;

    let index: number | undefined = child.index;
    // p.children = [...p.children]; // To update reference.

    if ((index && index < p.children.length) || index == 0) {
      p.children.splice(index, 0, child);
    } else {
      child.index = p.children.length;
      p.children.push(child);
      return;
    }

    this._shiftChildIndices(p.children, index + 1, 1);
  }
  private _rmvChildFromChildrenArr(childId: string, parentId: string): void {
    let p = this.get(parentId);
    if (!p || !p.children) return;

    let i = p.children.findIndex((ch) => ch.id === childId);

    if (i !== -1) {
      p.children.splice(i, 1);
      // p.children = [...p.children]; // To update reference.
      this._shiftChildIndices(p.children, i, -1);
    }
  }

  private _updateRefInTree(node: DataNode) {
    // Not sure if this is necessary.
    let newNode = { ...node };
    this._add(newNode);

    let parent = node.parentId && this.get(node.parentId);
    if (parent && parent.children) {
      let i = parent.children.findIndex((ch) => ch.id === node.id);
      parent.children.splice(i, 1, { ...node });
    }
  }

  // Public methods.
  // References are updated in methods add, rmv, mov, rnm, url

  public get baseNodeId(): string {
    return this._baseNodeId;
  }

  public get baseNode(): DataNode {
    return this._baseNode;
  }

  public get baseChildIds(): string[] {
    return this._baseChildIds;
  }

  public get allBkmArrCopy(): DataNode[] {
    return <DataNode[]>Array.from(this.bkms)
      .map((id) => this.get(id))
      .filter((el) => (el ? true : false));
  }

  public get recent(): DataNode[] {
    let arr = this.allBkmArrCopy;
    arr.sort((a, b) => (b.dateAdded || 0) - (a.dateAdded || 0));

    return arr;
  }

  public get(id: string): DataNode | undefined {
    return this._nodes.get(id);
  }
  public add(node: DataNode, i?: number): DataBase {
    // Reference to children array of parent
    // updated at this._addChildToChildrenArr

    if (i || i === 0) node.index = i;

    this._addId(node.id, Boolean(node.url));
    if (node.parentId) this._addChildToChildrenArr(node, node.parentId);
    this._add(node);
    this._invalidateSrhCache();

    return this;
  }
  public rmv(nodeId: string): DataBase {
    // Reference to children array of parent
    // updated at this._rmvChildFromChildrenArr

    let node = this.get(nodeId);
    if (!node) return this;

    this._rmvId(node.id, Boolean(node.url));
    if (node.parentId) this._rmvChildFromChildrenArr(node.id, node.parentId);
    this._rmv(node.id);
    this._invalidateSrhCache();

    return this;
  }

  public getAllChildren(id: string | undefined): DataNode[] {
    const parent = this.get(id || this._baseNodeId);
    if (!parent) return [];

    const nodes: DataNode[] = [];
    const addChildren = (node: DataNode) => {
      if (node.children)
        for (let ch of node.children) {
          nodes.push(ch);
          addChildren(ch);
        }
    };
    addChildren(parent);

    return nodes;
  }

  public mov(id: string, newParentId: string, index?: number): DataBase {
    // Reference to children array of parent updated at
    // this._addChildToChildrenArr and this._rmvChildFromChildrenArr

    let node = this.get(id);
    if (!node) return this;

    if (index && newParentId === node.parentId) {
      let currPar = this.get(node.parentId) as DataNode;
      let i = (currPar.children as DataNode[]).findIndex((ch) => ch.id === id);

      index = index > i ? index - 1 : index;
    }

    if (node.parentId) this._rmvChildFromChildrenArr(node.id, node.parentId);

    node.index = index || index === 0 ? index : Infinity;
    // Following function again sets the index if its too large.
    this._addChildToChildrenArr(node, newParentId);
    node.parentId = newParentId;

    return this;
  }

  public rnm(id: string, title: string): DataBase {
    let node = this.get(id);
    if (node) {
      node.title = title;
      // this._updateRefInTree(node); // To update the reference
      this._updateSrhResultId();
    }

    return this;
  }

  public url(id: string, url: string): DataBase {
    // to set the url of a bookmark.
    let node = this.get(id);
    if (node && Boolean(node.url)) {
      node.url = url;

      // let parent = this.get(<string>node.parentId);
      // this._updateRefInTree(node); // To update the reference
      (<any>node).urlLower = url.toLowerCase();
      this._updateSrhResultId();
    }

    return this;
  }

  public getParentChain(id: string): DataNode[] {
    let first = this.get(id);
    if (!first) return [];

    let chain = [first];

    let addParentNode = () => {
      let lastNode = chain[chain.length - 1];
      if (this.baseNodeId === lastNode.id || !lastNode.parentId) {
        return false;
      } else {
        let temp = this.get(lastNode.parentId);
        if (!temp) return false;

        chain.push(temp);
        return true;
      }
    };
    while (addParentNode()) 1;

    return chain;
  }

  public addParentChains(nodes: DataNode[]): DataNode[] {
    for (let node of nodes) {
      (node as any).parentChain = this.getParentChain(node.id);
    }

    return nodes;
  }

  public reorder(id: string, children: string[]): DataBase {
    let parent = this.get(id);
    if (parent) {
      parent.children = children.map((id) => {
        let node = this.get(id);
        if (!node) {
          // throw 'Node with given id not found while reordering.';
          return <DataNode>{};
        } else {
          return node;
        }
      });
      this._updateSrhResultId();
    }

    return this;
  }

  public async search(
    id: string,
    queryString: string
  ): Promise<NodeSearchResult> {
    return new Promise((resolve, reject) => {
      const q = queryString,
        resultId = this._getSrhCacheId();
      if (!q) resolve({ resultId, nodeScores: [] });

      if (
        !this._searchCache.resultId || // If its been invalidated.
        !this._searchCache ||
        !this._searchCache.isSameAs({ id, q })
      ) {
        let nodes = this.getAllChildren(id);
        const newCache = new SearchCache(new SearchResult(q), id, q);

        const queries = q.split(',').map((str) => str.trim());
        newCache.result.matchNodesAndQueries(nodes, queries);

        this._searchCache = newCache;
      }

      resolve({
        resultId,
        nodeScores: this._searchCache.result.scoredNodes
      });
    });
  }
  public refreshSearch() {
    return this.search(this._searchCache.id, this._searchCache.q);
  }
  public getCachedSrhResult(): Promise<NodeSearchResult> {
    return Promise.resolve({
      resultId: this._searchCache.resultId,
      nodeScores: this._searchCache.result.scoredNodes
    });
  }

  private _getSrhCacheId(): number {
    // 0 is for invalidated or deleted cache.
    return Math.random() + new Date().getTime();
  }
  private _updateSrhResultId() {
    // Not really reqd. because same objects are referenced everywhere.
    // this._searchCache.resultId = this._getSrhCacheId();
  }
  private _invalidateSrhCache() {
    this._searchCache.resultId = 0;
  }

  // Duplicates.
  public getDuplicates(ignoreHash: boolean): Promise<DataNode[][]> {
    return new Promise((res, rej) => {
      let arr = <DataNode[][]>[];

      let allBkm = this.allBkmArrCopy;
      allBkm.sort((a, b) => {
        // let ua = (<string>a.url).toLowerCase(),
        //   ub = (<string>b.url).toLowerCase();

        const ua: string =
          (a as any).urlLower ||
          ((a as any).urlLower = (a.url || '').toLowerCase());

        const ub: string =
          (b as any).urlLower ||
          ((b as any).urlLower = (b.url || '').toLowerCase());

        if (ua === ub) return 0;
        else return ua > ub ? 1 : -1;
      });

      for (let i = 0; i < allBkm.length; ) {
        let j = i + 1,
          matched = false,
          nodeGroup = <DataNode[]>[allBkm[i]],
          ui = (<any>allBkm[i]).urlLower;

        while (j < allBkm.length) {
          if ((<any>allBkm[j]).urlLower === ui) {
            matched = true;
            nodeGroup.push(allBkm[j++]);
          } else break;
        }
        i = j;
        if (matched) {
          arr.push(nodeGroup);
        }
      }

      return res(arr);
    });
  }
}

export { DataBase };
