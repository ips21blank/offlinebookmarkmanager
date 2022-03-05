import { DataNode } from '@proj-types/browser-types';
import { FLOW_DIRECTION } from '@proj-types/settings-types';

export class Utilities {
  static areArraysSame(arr1: Array<any>, arr2: Array<any>): boolean {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  static getNodeListForFol(
    dir: FLOW_DIRECTION,
    nodes: DataNode[],
    index: number,
    colCount: number
  ): DataNode[] {
    switch (dir) {
      case FLOW_DIRECTION.ROW:
        return this._getNodeListRowDir(nodes, index, colCount);
      case FLOW_DIRECTION.COLUMN:
        return this._getNodeListColDir(nodes, index, colCount);
      default:
        return this._getNodeListRowDir(nodes, index, colCount);
    }
  }

  private static _getNodeListRowDir(
    nodes: DataNode[],
    index: number,
    colCount: number
  ): DataNode[] {
    let output: DataNode[] = [];
    for (let i = index - 1; i < nodes.length; i += colCount) {
      output.push(nodes[i]);
    }
    return output;
  }

  private static _getNodeListColDir(
    nodes: DataNode[],
    index: number,
    colCount: number
  ): DataNode[] {
    let n: number = Math.ceil(nodes.length / colCount),
      i1: number,
      i2: number;

    i1 = n * (index - 1);
    i2 = i1 + n > nodes.length ? nodes.length : i1 + n;

    return nodes.slice(i1, i2);
  }
}
