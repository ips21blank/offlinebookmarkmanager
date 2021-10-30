type Node = chrome.bookmarks.BookmarkTreeNode;

class DataBase {
  bkms: Set<string>; // Ids of bookmarks.
  fols: Set<string>; // Ids of folders.
  _nodes: Map<string, Node>; // data objects for nodes.
  _baseNodeIds: Set<string>;

  constructor(treeNodes: Node[]) {
    let bkms: string[] = [],
      fols: string[] = [],
      _nodes: [string, Node][] = [];

    this._baseNodeIds = new Set<string>();

    let addNode = (n: Node) => {
      _nodes.push([n.id, n]);
      Boolean(n.url) ? bkms.push(n.id) : fols.push(n.id);
    };
    let recurseNode = (node: Node) => {
      // Children only - ignores node itself.
      if (!node.children?.length) return;

      let n: Node;
      for (let i = 0; i < node.children.length; i++) {
        n = node.children[i];
        addNode(n);
        n.children?.length ? recurseNode(n) : 1;
      }
    };

    for (let i = 0; i < treeNodes.length; i++) {
      // adding base node data.
      this._baseNodeIds.add(treeNodes[i].id);
      addNode(treeNodes[i]);
      recurseNode(treeNodes[i]);
    }

    this.bkms = new Set<string>(bkms); // Ids of bookmarks.
    this.fols = new Set<string>(fols); // Ids of folders.
    this._nodes = new Map<string, Node>(_nodes); // data objects for nodes.
  }

  // methods for edits after initialization.
  _add(node: Node): void {
    this._nodes.set(node.id, node);
  }
  _rmv(id: string): boolean {
    return this._nodes.delete(id);
  }
  _addId(id: string, isBkm: boolean): void {
    if (isBkm) {
      this.bkms.add(id);
    } else {
      this.fols.add(id);
    }
  }
  _rmvId(id: string, isBkm: boolean): void {
    if (isBkm) {
      this.bkms.delete(id);
    } else {
      this.fols.delete(id);
    }
  }

  _shiftIndicesOfChildren(ch: Node[], startI: number, change: number) {
    for (let i = 0; i < ch.length; i++) {
      if (ch[i]?.index || ch[i]?.index == 0) {
        ch[i].index! += change;
      }
    }
  }
  _addChild(childId: string, parentId: string, index?: number): void {
    let p = this.get(parentId),
      child = this.get(childId);
    if (!p || !p.children || !child) return;

    if ((index && index < p.children.length) || index == 0) {
      p.children.splice(index, 0, child);
    } else {
      p.children.push(child);
      return;
    }

    this._shiftIndicesOfChildren(p.children, index + 1, 1);
  }
  _rmvChild(childId: string, parentId: string): void {
    let p = this.get(parentId);
    if (!p || !p.children) return;

    let i = 0,
      n = p.children.length;
    for (i = 0; i < n; i++) {
      if (p.children[i].id == childId) break;
    }

    if (i < n) p.children.splice(i, 1);

    this._shiftIndicesOfChildren(p.children, i, -1);
  }

  // Methods for interface.
  add(node: Node) {
    this._addId(node.id, Boolean(node.url));
    if (node.parentId) this._addChild(node.id, node.parentId);
    this._add(node);
  }
  rmv(nodeId: string) {
    let node = this.get(nodeId);
    if (!node) return;

    this._rmvId(node.id, Boolean(node.url));
    if (node.parentId) this._rmvChild(node.id, node.parentId);
    this._rmv(node.id);
  }
  get(id: string): Node | undefined {
    return this._nodes.get(id);
  }
  getAll() {
    /* probably not required. */
  }

  mov(id: string, newParentId: string, index?: number): void {
    let node = this.get(id);
    if (!node) return;

    if (node.parentId) this._rmvChild(node.id, node.parentId);
    this._addChild(node.id, newParentId, index);
    node.parentId = newParentId;
  }

  rnm(id: string, title: string): void {
    let node = this.get(id);
    if (node) node.title = title;
  }

  url(id: string, url: string): void {
    // to set the url of a bookmark.
    let node = this.get(id);
    if (node && Boolean(node.url)) node.url = url;
  }

  getParentChain(id: string): Node[] {
    let addParentNode = (currChain: Node[]) => {
      let lastNode = currChain[currChain.length - 1];
      if (this._baseNodeIds.has(lastNode.id) || !lastNode.parentId) {
        return false;
      } else {
        let temp = this.get(lastNode.parentId);
        if (!temp) return false;

        currChain.push(temp);
        return true;
      }
    };

    let first = this.get(id);
    if (!first) return [];

    let chain = [first];
    while (addParentNode(chain)) {
      1;
    }

    return chain;
  }
}

export { DataBase };
