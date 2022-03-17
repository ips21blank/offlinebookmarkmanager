import { store } from '@redux/store';

import { DataNode, FLOW_DIRECTION } from '@proj-types/types';
import { DragMgr } from './drag-manager';
import { DRAGTYPE } from './globals';

type T = {
  node: DataNode;
  colIndex: number;
  colCount: number;
  direction: FLOW_DIRECTION;
};

class DragHandlers {
  public static data: { [key: string]: T } = {};

  public static dragoverNode(e: DragEvent) {
    let data: T,
      id = (e.target as HTMLElement).id;

    if (!(id && (data = DragHandlers.data[id]))) {
      return;
    }

    DragMgr.onDragoverNode(
      e,
      data.direction,
      data.node,
      data.colIndex,
      data.colCount
    );
  }

  public static dragStartNode(e: DragEvent) {
    let currEl = e.target as HTMLElement;
    let dragType = currEl.nodeName === 'a' ? DRAGTYPE.BKM : DRAGTYPE.FOL;
    DragMgr.onDragStart(e, currEl.id, dragType, currEl);
  }

  public static addEventsToNode(
    node: chrome.bookmarks.BookmarkTreeNode,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number
  ) {
    let el = document.getElementById(node.id);
    if (!el || !el.parentElement) return;

    DragHandlers.data[node.id] = { node, colIndex, colCount, direction };

    el.draggable = true;
    el.addEventListener('dragstart', DragHandlers.dragStartNode);
    el.addEventListener('dragend', DragMgr.onDragEnd);

    //
    el.parentElement.addEventListener('dragover', DragHandlers.dragoverNode);
    el.parentElement.addEventListener('drop', DragMgr.onDrop);
    el.parentElement.addEventListener('dragleave', DragMgr.onDragLeave);
  }

  public static removeEventsFromNode(nodeId: string) {
    let el = document.getElementById(nodeId);
    if (!el || !el.parentElement) return;

    delete DragHandlers.data[nodeId];

    el.removeEventListener('dragover', DragHandlers.dragoverNode);
    el.parentElement.addEventListener('drop', DragMgr.onDrop);
    el.parentElement.addEventListener('dragleave', DragMgr.onDragLeave);

    //
    el.addEventListener('dragstart', DragHandlers.dragStartNode);
    el.addEventListener('dragend', DragMgr.onDragEnd);
  }
}

export { DragHandlers as DragEventHandlers };
