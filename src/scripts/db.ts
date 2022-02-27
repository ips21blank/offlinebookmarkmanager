import { DataNode } from '@proj-types/types';
import { Children } from 'react';

class DataBase {
  public bkms: Set<string>; // Ids of bookmarks.
  public fols: Set<string>; // Ids of folders.
  private _nodes: Map<string, DataNode>; // data objects for nodes.
  private _baseNodeIds: Set<string>;

  constructor(treeNodes: DataNode[]) {
    let bkms: string[] = [],
      fols: string[] = [],
      _nodes: [string, DataNode][] = [];

    this._baseNodeIds = new Set<string>();

    const addNode = (n: DataNode): void => {
      _nodes.push([n.id, n]);
      Boolean(n.url) ? bkms.push(n.id) : fols.push(n.id);
    };

    let recurseNode = (node: DataNode): void => {
      // Children only - ignores node itself.
      if (!node.children?.length) return;

      let n: DataNode;
      for (let i = 0; i < node.children?.length; i++) {
        n = node.children[i];
        addNode(n);
        n.children?.length ? recurseNode(n) : 1;
      }
    };

    for (let i = 0; i < treeNodes.length; i++) {
      // adding base node data.
      this._baseNodeIds.add(treeNodes[i].id);

      // adding children
      addNode(treeNodes[i]);
      recurseNode(treeNodes[i]);
    }

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

    if ((index && index < p.children.length) || index == 0) {
      p.children.splice(index, 0, child);
    } else {
      child.index = p.children.length;
      p.children.push(child);

      p.children = [...p.children]; // To update reference.
      return;
    }

    this._shiftChildIndices(p.children, index + 1, 1);
  }
  private _rmvChildFromChildrenArr(childId: string, parentId: string): void {
    let p = this.get(parentId);
    if (!p || !p.children) return;

    let i = 0,
      n = p.children.length;
    for (i = 0; i < n; i++) {
      if (p.children[i].id == childId) break;
    }

    if (i < n) {
      p.children = [...p.children.splice(i, 1)]; // To update reference.
      this._shiftChildIndices(p.children, i, -1);
    }
  }

  // Public methods.
  // References are updated in methods add, rmv, mov, rnm, url

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

    return this;
  }
  public getAll() {
    /* probably not required. */
  }

  public mov(id: string, newParentId: string, index?: number): DataBase {
    // Reference to children array of parent updated at
    // this._addChildToChildrenArr and this._rmvChildFromChildrenArr

    let node = this.get(id);
    if (!node) return this;

    if (node.parentId) this._rmvChildFromChildrenArr(node.id, node.parentId);

    if (index || index === 0) node.index = index;
    this._addChildToChildrenArr(node, newParentId);
    node.parentId = newParentId;

    return this;
  }

  public rnm(id: string, title: string): DataBase {
    let node = this.get(id);
    if (node) {
      node.title = title;
      this._add({ ...node }); // To update the reference
    }

    return this;
  }

  public url(id: string, url: string): DataBase {
    // to set the url of a bookmark.
    let node = this.get(id);
    if (node && Boolean(node.url)) {
      node.url = url;
      this._add({ ...node }); // To update the reference
    }

    return this;
  }

  public getParentChain(id: string): DataNode[] {
    let first = this.get(id);
    if (!first) return [];

    let chain = [first];

    let addParentNode = () => {
      let lastNode = chain[chain.length - 1];
      if (this._baseNodeIds.has(lastNode.id) || !lastNode.parentId) {
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
    }

    return this;
  }
}

export { DataBase };
