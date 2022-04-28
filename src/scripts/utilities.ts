import { DataNode, FLOW_DIRECTION } from '@proj-types/types';
import {
  ACCORDION_CLASSES,
  DRAG_REG,
  FOLDER_CLASSES,
  GLOBAL_SETTINGS,
  REG_CLASSES
} from './globals';
import React from 'react';

export class Utilities {
  public static domNIndexReg: RegExp = /:\/\/\/?/;

  public static getRegClass(reg: DRAG_REG, direction: FLOW_DIRECTION): string {
    let colDir: boolean = direction === FLOW_DIRECTION.COLUMN ? true : false;

    switch (reg) {
      case DRAG_REG.BEF:
        return colDir ? REG_CLASSES.COL_BEF : REG_CLASSES.ROW_BEF;
        break;
      case DRAG_REG.BET:
        return colDir ? REG_CLASSES.COL_BET : REG_CLASSES.ROW_BET;
        break;
      case DRAG_REG.AFT:
      default:
        return colDir ? REG_CLASSES.COL_AFT : REG_CLASSES.ROW_AFT;
    }
  }

  public static getBetClass(currClass: string): string {
    return currClass.match(/^row/i) ? REG_CLASSES.ROW_BET : REG_CLASSES.COL_BET;
  }

  public static isElementInFolderColumn(el: HTMLElement | null): boolean {
    if (!el || !el.parentElement) return false;

    let parent: HTMLElement | null = el.parentElement;
    if (parent.classList.contains(FOLDER_CLASSES.FOL)) {
      parent = parent.parentElement;
    }
    return Boolean(
      parent && parent.classList.contains(ACCORDION_CLASSES.folCol)
    );
  }

  private static _pinSuffix = '-pin-fol';
  public static getPinId(id: string): string {
    return id + this._pinSuffix;
  }
  public static parsePinId(id: string): string {
    let i = id.indexOf(this._pinSuffix);
    return id.substring(0, i !== -1 ? i : id.length);
  }
  public static isPinFolId(id: string): boolean {
    return id.indexOf(this._pinSuffix) !== -1;
  }

  public static dummyContent(i0: number) {
    let res: any[] = [];
    for (let i = 0; i < i0; i++) {
      res.push(
        React.createElement('div', { key: i }, `Element No. : ${i + 1}`)
      );
    }
    return res;
  }

  public static areArraysSame(arr1: Array<any>, arr2: Array<any>): boolean {
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

  private static _getDomN(url: string): string {
    let m = url.match(Utilities.domNIndexReg);
    if (!m || !m.index) return url;

    return url.substring(m.index + m[0].length, url.length).toLowerCase();
  }

  public static sortNodesForGrouping(nodes: DataNode[]): DataNode[] {
    let sortedNodes = [...nodes];

    sortedNodes.sort((a, b) => {
      if (!a.url) {
        if (b.url) {
          return -1;
        }
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      } else {
        if (!b.url) return 1;
      }

      return Utilities._getDomN(a.url) > Utilities._getDomN(b.url) ? 1 : -1;
    });

    return sortedNodes;
  }

  public static getNodeListForFol(
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
    colIndex: number,
    colCount: number
  ): DataNode[] {
    let output: DataNode[] = [];
    let indices = Utilities.getNodeIndicesRowDir(
      nodes.length,
      colIndex,
      colCount
    );
    for (let i = 0; i < indices.length; i++) {
      output.push(nodes[indices[i]]);
    }
    return output;
  }
  public static getNodeIndicesRowDir(
    nodeCount: number,
    colIndex: number,
    colCount: number
  ): number[] {
    let indices: number[] = [];
    for (let i = colIndex - 1; i < nodeCount; i += colCount) {
      indices.push(i);
    }
    return indices;
  }

  private static _getNodeListColDir(
    nodes: DataNode[],
    colIndex: number,
    colCount: number
  ): DataNode[] {
    let [i1, i2] = Utilities.getNodeIndicesColDir(
      nodes.length,
      colIndex,
      colCount
    );

    return nodes.slice(i1, i2);
  }
  public static getNodeIndicesColDir(
    nodeCount: number,
    colIndex: number,
    colCount: number
  ): [number, number] {
    let n: number = Math.ceil(nodeCount / colCount),
      i1: number,
      i2: number;
    let minRowsPerCol = GLOBAL_SETTINGS.minRowsPerCol;

    n < minRowsPerCol ? (n = minRowsPerCol) : 1;

    i1 = n * (colIndex - 1);
    i2 = i1 + n > nodeCount ? nodeCount : i1 + n;

    return [i1, i2];
  }

  public static getAdjacentIndices(
    siblingCount: number,
    currI: number,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number
  ): [number | null, number | null] {
    if (colCount === 1) {
      // when there is only one row - assuming that its a subfolder.
      return [
        currI > 0 ? currI - 1 : null,
        currI === siblingCount - 1 ? null : currI + 1
      ];
    }

    if (direction === FLOW_DIRECTION.ROW) {
      // Row Direction.
      return [
        colIndex > 1 ? currI - 1 : null,
        /* colIndex < colCount && */ currI < siblingCount - 1 ? currI + 1 : null
      ];
    } else {
      // Column Direction.
      const getCol = (i: number) =>
        Utilities.getNodeIndicesColDir(siblingCount, i, colCount);
      let prevI: number | null = null,
        nextI: number | null = null;

      let currCol = getCol(colIndex);

      if (currCol[0] < currI) {
        prevI = currI - 1;
      }
      if (currCol[1] > currI + 1) {
        nextI = currI + 1;
      }

      // if (currCol[0] <= currI && currCol[1] >= currI) {
      //   if (colIndex !== 1) {
      //     let prevCol = getCol(colIndex - 1);
      //     prevI = currI - currCol[0] + prevCol[0];
      //   }
      //   if (colIndex !== colCount) {
      //     let nextCol = getCol(colIndex + 1);
      //     nextI = currI - currCol[0] + nextCol[0];

      //     if (nextI + colIndex * (currCol[1] - currCol[0]) > siblingCount) {
      //       nextI = null;
      //     }
      //   }
      // }
      return [prevI, nextI];
    }
  }
}
