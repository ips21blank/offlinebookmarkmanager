import { DataNode, FLOW_DIRECTION } from '@proj-types/types';
import { getCount, getNodeById } from '@redux/initial-states';
import {
  DRAGTYPE,
  DRAG_REG,
  GLOBAL_SETTINGS,
  REG_CLASSES,
  getRegClass
} from './globals';
import { Utilities } from './utilities';

class DragMgr {
  private static _n = 0;
  public static get count() {
    return DragMgr._n;
  }
  public static set count(n: number) {
    DragMgr._n = n;
  }

  public static inc(n = 1) {
    DragMgr._n += n;
  }
  public static dec(n = 1) {
    DragMgr._n -= n;
  }

  private _updateCount() {
    DragMgr.count = getCount();
  }

  private static _dragOverTime?: number;
  private static _dragSwitchThreshold = GLOBAL_SETTINGS.dragSwitchThreshold;

  private static _draggedElId?: string;
  private static _draggedElType?: DRAGTYPE;

  private static _currDragOverId?: string;
  private static _currDragOverClass?: string;
  private static _updatePending?: boolean;

  // EVENTS

  public static onDragStart(
    event: DragEvent,
    id: string,
    elType: DRAGTYPE,
    currEl: HTMLElement | null
  ) {
    // e.dataTransfer.setData('type', elType);
    // e.dataTransfer.setData('id', id);
    DragMgr._draggedElId = id;
    DragMgr._draggedElType = elType;

    DragMgr._addBeingDragged(currEl);
    // currEl &&
    //   currEl.parentElement &&
    //   currEl.parentElement.classList.add('being-dragged');

    // When dragging pins or titles or when a single node is being dragged.
    if (
      elType === DRAGTYPE.FOLDER_PIN ||
      elType === DRAGTYPE.FULL_VIEW_HEADING ||
      DragMgr._n < 2
    ) {
      return;
    }

    // When dragging multiple nodes.
    let dragEl = document.getElementById('drag-multiple-el');
    dragEl &&
      event.dataTransfer &&
      event.dataTransfer.setDragImage(dragEl, 0, 0);
  }

  public static onDragoverNode(
    event: DragEvent,
    direction: FLOW_DIRECTION,
    node: DataNode,
    colIndex: number,
    colCount: number
  ) {
    event.stopPropagation();
    let currEl = event.target as HTMLElement;

    if (currEl && DragMgr._draggedElId === currEl.id) {
      DragMgr._cleanExistingClasses();
      return;
    }

    let rect = currEl && currEl.getBoundingClientRect();
    if (!currEl || !rect) {
      // prev and next elements may not exist.
      return;
    }

    let region = DragMgr._getDragReg(
      event,
      rect,
      direction,
      currEl.tagName.toLowerCase() === 'a'
    );

    let newClass = getRegClass(region, direction);

    // Following will still run multiple times.
    if (
      this._currDragOverId == currEl.id &&
      currEl.classList.contains(newClass)
    ) {
      DragMgr._updatePending = false;
      return;
    }
    this._currDragOverId = currEl.id;
    this._currDragOverClass = newClass;
    DragMgr._updatePending = true;

    setTimeout(() => {
      DragMgr._updateElementClasses(
        node,
        currEl,
        newClass,
        direction,
        colIndex,
        colCount,
        region
      );
    }, GLOBAL_SETTINGS.dragOverThreshold);
  }
  private static _updateElementClasses(
    node: DataNode,
    currEl: HTMLElement,
    newClass: string,
    direction: FLOW_DIRECTION,
    colIndex: number,
    colCount: number,
    region: DRAG_REG
  ) {
    if (
      currEl.id !== this._currDragOverId ||
      newClass !== this._currDragOverClass ||
      !DragMgr._updatePending
    ) {
      return;
    } else {
      DragMgr._updatePending = false;
    }

    DragMgr._addClassToEl(currEl, newClass);

    let exceptionData: any = { [newClass]: currEl.id };

    if (!node.parentId || (!node.index && node.index !== 0)) {
      return;
    }
    let siblings = (getNodeById(node.parentId) as DataNode)
      .children as DataNode[];
    let [prevI, nextI] = Utilities.getAdjacentIndices(
      siblings.length,
      node.index,
      direction,
      colIndex,
      colCount
    );

    switch (region) {
      case DRAG_REG.BEF:
        if (prevI || prevI === 0) {
          let prevNode = siblings[prevI];

          let el = document.getElementById(prevNode.id);
          if (el) {
            let prevClass = getRegClass(DRAG_REG.AFT, direction);
            DragMgr._addClassToEl(el, prevClass);
            // el.classList.add(prevClass);
            exceptionData[prevClass] = el.id;
          }
        }
        break;
      case DRAG_REG.BET:
        break;
      case DRAG_REG.AFT:
      default:
        if (nextI || nextI === 0) {
          let nextNode = siblings[nextI];

          let el = document.getElementById(nextNode.id);
          if (el) {
            let nextClass = getRegClass(DRAG_REG.BEF, direction);
            DragMgr._addClassToEl(el, nextClass);
            // el.classList.add(nextClass);
            exceptionData[nextClass] = el.id;
          }
        }
    }

    DragMgr._cleanExistingClasses(exceptionData);
  }
  private static _addClassToEl(el: HTMLElement, className: string) {
    el.classList.add(className);
  }
  private static _addBeingDragged(el: HTMLElement | null) {
    if (!el) return;

    el.tagName.toLowerCase() === 'a'
      ? el.classList.add('being-dragged')
      : el.parentElement && el.parentElement?.classList.add('being-dragged');
  }

  private static _getDragReg(
    event: DragEvent,
    rect: DOMRect,
    direction: FLOW_DIRECTION,
    isAnchorEl: boolean
  ): DRAG_REG {
    let percent: number;

    switch (direction) {
      case FLOW_DIRECTION.ROW:
        percent = (event.clientX - rect.left) / rect.width;
        break;
      case FLOW_DIRECTION.COLUMN:
      default:
        percent = (event.clientY - rect.top) / rect.height;
        break;
    }

    if (isAnchorEl) {
      return percent < 0.5 ? DRAG_REG.BEF : DRAG_REG.AFT;
    }

    if (percent < GLOBAL_SETTINGS.dragMarginsPercentMin) {
      return DRAG_REG.BEF;
    } else if (percent > GLOBAL_SETTINGS.dragMarginsPercentMax) {
      return DRAG_REG.AFT;
    } else {
      return DRAG_REG.BET;
    }
  }
  private static _cleanExistingClasses(exceptionData?: {
    [key: string]: string;
  }) {
    const clearRegClass = (regClass: any) => {
      let elList = document.getElementsByClassName(regClass),
        exceptId: any = exceptionData && exceptionData[regClass];

      let i = 0;
      while (elList.length - i) {
        if (elList[i].id == exceptId) {
          i++;
          continue;
        }
        elList[i].classList.remove(regClass);
      }
    };

    for (let reg in REG_CLASSES) {
      clearRegClass(REG_CLASSES[reg]);
    }
  }

  public static onDrop(e: DragEvent) {
    e.stopPropagation();
    DragMgr._cleanExistingClasses();
  }
  public static onDragEnd(
    e: DragEvent
    // currEl: HTMLElement | null
  ) {
    e.stopPropagation();

    let elList = document.getElementsByClassName('being-dragged');
    while (elList.length) elList[0].classList.remove('being-dragged');

    DragMgr._cleanExistingClasses();
  }
  public static onDragLeave(e: DragEvent) {
    e.stopPropagation();
    let dragLeaveTime = new Date().getTime();

    setTimeout(() => {
      if (DragMgr._dragOverTime && DragMgr._dragOverTime < dragLeaveTime)
        DragMgr._cleanExistingClasses();
    }, DragMgr._dragSwitchThreshold);
  }
}

export { DragMgr };
