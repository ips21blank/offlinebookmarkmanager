import { DataNode, DISP_MODES, FLOW_DIRECTION } from '@proj-types/types';
import { DragMgr } from './drag-manager';
import { DRAGTYPE, SELECT_CLASS } from '../globals';
import { isDragging } from './custom-drag-events';
import { store, selectDeselectNode } from '@redux/redux';

type T = {
  node: DataNode;
  colIndex: number;
  colCount: number;
  direction: FLOW_DIRECTION;
};

let dragEl: HTMLElement;
// Dragend is global.
window.addEventListener('customend', (e) => {
  e.stopPropagation();
  dragEl && dragEl.classList.add('hidden');

  DragMgr.onDragEnd();
});

const setDragElPosn = (x: number, y: number) => {
  let hidden = dragEl.classList.contains('hidden');
  if (isDragging()) {
    hidden && dragEl.classList.remove('hidden');
    dragEl.style.left = `${x}px`;
    dragEl.style.top = `${y}px`;
  } else if (!hidden) {
    dragEl.classList.add('hidden');
  }
};
window.addEventListener('mousemove', (e) => {
  dragEl = document.getElementById('drag-elements-el') as HTMLElement;
  if (isDragging() && dragEl) {
    setDragElPosn(e.clientX, e.clientY);
  }
});

const rmvWasMovedClass = () => {
  let elList = document.getElementsByClassName(SELECT_CLASS.WAS_SEL);

  while (elList.length)
    elList[elList.length - 1].classList.remove(SELECT_CLASS.WAS_SEL);
};
window.addEventListener('mousedown', rmvWasMovedClass);

//
class DragHandlers {
  public static data: { [key: string]: T } = {};

  public static highlightNodesMoved(idList: string[]) {
    let el: HTMLElement | null;

    rmvWasMovedClass();
    for (let id of idList) {
      el = document.getElementById(id);
      el && el.classList.add(SELECT_CLASS.WAS_SEL);
    }
  }

  public static nodeClick(e: MouseEvent) {
    // Handles node selection via click for drag and drop.
    e.preventDefault();
    let el = e.target as HTMLElement,
      node = DragHandlers.data[el.id].node,
      sel = DragMgr.selection;
    if (!node) return;

    store.dispatch(selectDeselectNode(node.id, node.url ? true : false));
  }

  public static dragoverNode(e: MouseEvent) {
    if (!isDragging()) return;
    e.preventDefault();
    e.stopPropagation();

    setDragElPosn(e.clientX, e.clientY);

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

  public static dragStartNode(e: Event) {
    e.stopPropagation();
    // e.preventDefault();

    let currEl = e.target as HTMLElement;
    let dragType =
      currEl.tagName.toLowerCase() === 'a' ? DRAGTYPE.BKM : DRAGTYPE.FOL;

    DragMgr.onDragStart(currEl.id, dragType, currEl);
  }

  public static onDragLeave(e: MouseEvent) {
    isDragging() && DragMgr.onDragLeave(e);
  }

  public static addEventsToNode(
    node: chrome.bookmarks.BookmarkTreeNode,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number,
    dispMode: DISP_MODES
  ) {
    let el = document.getElementById(node.id);
    if (!el) return;

    // The case where this persists and node is removed is ignored.
    DragHandlers.data[node.id] = { node, colIndex, colCount, direction };

    //
    // Note: customdrag is slow.
    el.addEventListener('customdrag', DragHandlers.dragStartNode);
    el.addEventListener('mousemove', DragHandlers.dragoverNode);
    el.addEventListener('mouseleave', DragHandlers.onDragLeave);
    el.addEventListener('customdrop', DragMgr.onDrop);

    if (dispMode === DISP_MODES.EDIT) {
      el.addEventListener('click', DragHandlers.nodeClick);
    }
  }

  public static removeEventsFromNode(nodeId: string) {
    let el = document.getElementById(nodeId);
    if (!el) return;

    //
    // Note: customdrag is slow.
    el.removeEventListener('customdrag', DragHandlers.dragStartNode);
    el.removeEventListener('mousemove', DragHandlers.dragoverNode);
    el.removeEventListener('mouseleave', DragHandlers.onDragLeave);
    el.removeEventListener('customdrop', DragMgr.onDrop);

    el.removeEventListener('click', DragHandlers.nodeClick);
  }
}

export { DragHandlers as DragEventHandlers };
