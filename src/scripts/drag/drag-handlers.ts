import { DataNode, DISP_MODES, FLOW_DIRECTION } from '@proj-types/types';
import { DragMgr } from './drag-manager';
import {
  BEING_DRAGGED_OVER,
  DRAGTYPE,
  FOLDER_CLASSES,
  GLOBAL_SETTINGS,
  SELECT_CLASS
} from '../globals';
import { isDragging } from './custom-drag-events';
import { store, selectDeselectNode } from '@redux/redux';
import { Utilities } from '@scripts/utilities';
import { Scroller } from '../scroller';

type T = {
  node: DataNode;
  colIndex: number;
  colCount: number;
  direction: FLOW_DIRECTION;
};

let dragEl: HTMLElement;
const scroller = new Scroller();

// Dragend is global.
window.addEventListener('customend', (e) => {
  e.stopPropagation();
  dragEl && dragEl.classList.add('hidden');
  scroller.stopMoving();

  DragMgr.onDragEnd();
});

const setDragElPosn = (x: number, y: number) => {
  let hidden = dragEl.classList.contains('hidden');
  if (isDragging()) {
    hidden && dragEl.classList.remove('hidden');
    dragEl.style.left = `${x}px`;
    dragEl.style.top = `${y}px`;

    if (y / window.innerHeight < GLOBAL_SETTINGS.scrollStartReg.up) {
      scroller.startMovingUpwards();
    } else if (y / window.innerHeight > GLOBAL_SETTINGS.scrollStartReg.dn) {
      scroller.startMovingDownwards();
    } else {
      scroller.stopMoving();
    }
  } else {
    if (!hidden) {
      dragEl.classList.add('hidden');
      console.log('added it again.');
    }
    scroller.stopMoving();
  }
};
window.addEventListener('mousemove', (e) => {
  dragEl = document.getElementById('drag-elements-el') as HTMLElement;
  if (isDragging() && dragEl) {
    setDragElPosn(e.clientX, e.clientY);
    DragMgr.cleanExistingClasses();
  }
});

const rmvWasMovedShwInFolClass = () => {
  let elList = document.getElementsByClassName(SELECT_CLASS.WAS_SEL);

  while (elList.length)
    elList[elList.length - 1].classList.remove(SELECT_CLASS.WAS_SEL);

  elList = document.getElementsByClassName(SELECT_CLASS.SHW_IN_FOL);

  while (elList.length)
    elList[elList.length - 1].classList.remove(SELECT_CLASS.SHW_IN_FOL);
};
window.addEventListener('mousedown', rmvWasMovedShwInFolClass);

//
class DragHandlers {
  public static data: { [key: string]: T } = {};
  private static _dragType: DRAGTYPE;
  private static _pinCache: string[];

  public static highlightNodesMoved(idList: string[]) {
    let el: HTMLElement | null;

    rmvWasMovedShwInFolClass();
    for (let id of idList) {
      el = document.getElementById(id);
      el && el.classList.add(SELECT_CLASS.WAS_SEL);
    }
  }

  public static nodeClick(e: MouseEvent) {
    // It may be better to use it here than trigger un-necessary re-renders.
    if (store.getState().displayState.mode !== DISP_MODES.EDIT) return;

    // Handles node selection via click for drag and drop.
    e.preventDefault();
    let el = e.target as HTMLElement,
      node = DragHandlers.data[el.id].node,
      sel = DragMgr.selection;
    if (!node) return;

    store.dispatch(selectDeselectNode(node.id, node.url ? true : false));
  }

  public static dragStart(e: Event) {
    e.stopPropagation();
    // e.preventDefault();

    let currEl = e.target as HTMLElement;
    let dragType: DRAGTYPE;
    if (currEl.tagName.toLowerCase() === 'a') {
      dragType = DRAGTYPE.BKM;
    } else if (currEl.parentElement?.classList.contains(FOLDER_CLASSES.FOL)) {
      dragType = DRAGTYPE.FOL;
    } else {
      dragType = DRAGTYPE.FOLDER_PIN;
    }
    DragHandlers._pinCache = store.getState().settings.pins;
    DragHandlers._dragType = dragType;

    DragMgr.onDragStart(currEl.id, dragType, currEl);
  }

  private static _checkDraggingAndPositionEl(e: MouseEvent): boolean {
    if (!isDragging()) return false;

    e.preventDefault();
    e.stopPropagation();

    setDragElPosn(e.clientX, e.clientY);

    return true;
  }

  public static dragoverNode(e: MouseEvent) {
    if (DragHandlers._dragType === DRAGTYPE.FOLDER_PIN) return;
    if (!DragHandlers._checkDraggingAndPositionEl(e)) return;

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

  public static dragoverPin(e: MouseEvent) {
    if (!DragHandlers._checkDraggingAndPositionEl(e)) return;
    DragHandlers.updateContainerDragOverClass(false);

    DragMgr.onDragoverPin(e, DragHandlers._pinCache, DragHandlers._dragType);
  }

  public static updateContainerDragOverClass(add: boolean) {
    if (add) {
      const el = document.getElementById('pinned-folders');
      el && el.classList.add(BEING_DRAGGED_OVER);

      return;
    }
    const elList = document.getElementsByClassName(BEING_DRAGGED_OVER);
    while (elList.length) elList[0].classList.remove(BEING_DRAGGED_OVER);
  }
  public static pinContainerDragover(e: MouseEvent) {
    if (!DragHandlers._checkDraggingAndPositionEl(e)) return;
    DragHandlers.updateContainerDragOverClass(true);
  }
  public static pinContainerLeave(e: MouseEvent) {
    DragHandlers.updateContainerDragOverClass(false);
  }

  public static onDragLeave(e: MouseEvent) {
    isDragging() && DragMgr.onDragLeave(e);
  }

  public static dropOnPin(e: Event) {
    DragMgr.dropOnPin(e, DragHandlers._dragType, DragHandlers._pinCache);
  }

  public static dropOnPinContainer(e: Event) {
    DragMgr.dropOnPinContainer(e, DragHandlers._dragType);
  }

  public static addEventsToNode(
    node: chrome.bookmarks.BookmarkTreeNode,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number,
    dispMode: DISP_MODES
  ) {
    let el = document.getElementById(node.id);
    if (!el) throw 'Element for drag events not found.';

    // The case where this persists and node is removed is ignored.
    DragHandlers.data[node.id] = { node, colIndex, colCount, direction };

    //
    // Note: customdrag is slow.
    el.addEventListener('customdrag', DragHandlers.dragStart);
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
    el.removeEventListener('customdrag', DragHandlers.dragStart);
    el.removeEventListener('mousemove', DragHandlers.dragoverNode);
    el.removeEventListener('mouseleave', DragHandlers.onDragLeave);
    el.removeEventListener('customdrop', DragMgr.onDrop);

    el.removeEventListener('click', DragHandlers.nodeClick);
  }

  public static addEventsToPin(folId: string) {
    const el = document.getElementById(Utilities.getPinId(folId));
    if (!el) throw 'Element for drag events not found.';

    el.addEventListener('customdrag', DragHandlers.dragStart);
    el.addEventListener('mousemove', DragHandlers.dragoverPin);
    el.addEventListener('mouseleave', DragHandlers.onDragLeave);
    el.addEventListener('customdrop', DragHandlers.dropOnPin);
  }

  public static addEventsToPinnedFolContainer() {
    const el = document.getElementById('pinned-folders');
    if (!el) return;

    // To highlight the region before drop.
    el.addEventListener('mousemove', DragHandlers.pinContainerDragover);
    el.addEventListener('mouseleave', DragHandlers.pinContainerLeave);
    el.addEventListener('customdrop', DragHandlers.dropOnPinContainer);
  }
}

export { DragHandlers as DragEventHandlers };
