import { DataNode, DISP_MODES, FLOW_DIRECTION } from '@proj-types/types';
import { DragMgr } from './drag-manager';
import { DRAGTYPE } from './globals';
import { isDragging } from './browser/custom-drag-events';
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
// window.addEventListener('click', (e) => {
//   let l = console.log;
//   l(`clnt : (${e.clientX}, ${e.clientY})`);
//   l(`ofst : (${e.offsetX}, ${e.offsetY})`);
//   l(`page : (${e.pageX}, ${e.pageY})`);
//   l(`scrn : (${e.screenX}, ${e.screenY})`);
//   l('...............................................');
// });
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
  dragEl = dragEl || document.getElementById('drag-elements-el');
  if (!dragEl) return;

  setDragElPosn(e.clientX, e.clientY);
});

//
class DragHandlers {
  public static data: { [key: string]: T } = {};

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

  public static dragEnd(e: Event) {}

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

    //
    el.addEventListener('customdrag', DragHandlers.dragStartNode);
    el.addEventListener('mousemove', DragHandlers.dragoverNode);
    el.addEventListener('mouseleave', DragMgr.onDragLeave);
    el.addEventListener('customdrop', DragMgr.onDrop);

    if (dispMode === DISP_MODES.EDIT) {
      el.addEventListener('click', DragHandlers.nodeClick);
    }
  }
}

export { DragHandlers as DragEventHandlers };
