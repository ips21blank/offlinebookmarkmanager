import { DataNode, DISP_MODES, FLOW_DIRECTION } from '@proj-types/types';
import { DragMgr } from './drag-manager';
import { DRAGTYPE } from './globals';
import { store, selectDeselectNode } from '@redux/redux';

type T = {
  node: DataNode;
  colIndex: number;
  colCount: number;
  direction: FLOW_DIRECTION;
};

class DragHandlers {
  public static data: { [key: string]: T } = {};

  public static nodeClick(e: MouseEvent) {
    // Handles node selection via click for drag and drop.
    e.preventDefault();
    let el = e.target as HTMLElement,
      node = DragHandlers.data[el.id].node,
      sel = DragMgr.selection;
    if (!node) return;

    node.url
      ? store.dispatch(selectDeselectNode(node.id, true))
      : store.dispatch(selectDeselectNode(node.id, false));
  }

  public static dragoverNode(e: DragEvent) {
    e.preventDefault();
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
  public static dragenter(e: DragEvent) {
    e.preventDefault();
  }

  public static dragStartNode(e: DragEvent) {
    let currEl = e.target as HTMLElement;
    let dragType =
      currEl.tagName.toLowerCase() === 'a' ? DRAGTYPE.BKM : DRAGTYPE.FOL;
    DragMgr.onDragStart(e, currEl.id, dragType, currEl);
  }

  public static addEventsToNode(
    node: chrome.bookmarks.BookmarkTreeNode,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number,
    dispMode: DISP_MODES
  ) {
    let el = document.getElementById(node.id);
    if (!el || !el.parentElement) return;

    // The case where this persists and node is removed is ignored.
    DragHandlers.data[node.id] = { node, colIndex, colCount, direction };

    el.draggable = true;
    el.addEventListener('dragstart', DragHandlers.dragStartNode);
    // el.addEventListener('dragend', DragMgr.onDragEnd);

    //
    el.addEventListener('dragover', DragHandlers.dragoverNode);
    el.addEventListener('dragenter', DragHandlers.dragenter);
    el.addEventListener('drop', DragMgr.onDrop);
    // el.addEventListener('dragleave', DragMgr.onDragLeave);

    if (dispMode === DISP_MODES.EDIT) {
      el.addEventListener('click', DragHandlers.nodeClick);
    }
  }

  public static removeEventsFromNode(nodeId: string) {
    let el = document.getElementById(nodeId);
    if (!el || !el.parentElement) return;

    delete DragHandlers.data[nodeId];

    el.removeEventListener('dragstart', DragHandlers.dragStartNode);
    // el.removeEventListener('dragend', DragMgr.onDragEnd);

    //
    el.removeEventListener('dragover', DragHandlers.dragoverNode);
    el.removeEventListener('dragenter', DragHandlers.dragenter);
    el.removeEventListener('drop', DragMgr.onDrop);
    // el.removeEventListener('dragleave', DragMgr.onDragLeave);

    el.removeEventListener('click', DragHandlers.nodeClick);
  }
}

export { DragHandlers as DragEventHandlers };
