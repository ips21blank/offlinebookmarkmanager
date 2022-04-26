import { DataNode, FLOW_DIRECTION } from '@proj-types/types';
import { getNodeById } from '@redux/initial-states';
import {
  DRAGTYPE,
  DRAG_REG,
  GLOBAL_SETTINGS,
  REG_CLASSES,
  SELECTION,
  FOLDER_CLASSES,
  ACCORDION_CLASSES
} from '../globals';
import { Utilities } from '../utilities';
import { browserAPI } from '../browser/browser-api';
import {
  store,
  selectDeselectNode,
  startDrag,
  endDrag,
  highlightElementsMoved
} from '@redux/redux';

class DragMgr {
  public static selection = SELECTION;

  private static _dragOverTime?: number;

  private static _draggedElId?: string;

  // The element on which some other element is being dragged.
  private static _currDragOverId?: string;
  private static _currReg: DRAG_REG;
  private static _updatePending?: boolean;

  // EVENTS
  public static noClick(el: HTMLElement) {
    let isBkm = el.classList.contains('bookmark');

    let eatClick = (e: MouseEvent) => {
      if (isBkm) {
        e.preventDefault();
      } else {
        (e.target as HTMLElement).classList.add(FOLDER_CLASSES.NO_EXP);
      }

      el.removeEventListener('click', eatClick);
    };
    el.addEventListener('click', eatClick);
  }

  public static onDragStart(
    id: string,
    elType: DRAGTYPE,
    currEl: HTMLElement | null
  ) {
    DragMgr._draggedElId = id;
    DragMgr._addBeingDraggedClass(currEl);
    store.dispatch(selectDeselectNode(id, elType === DRAGTYPE.BKM, true));
    store.dispatch(startDrag(id));
  }

  public static onDragoverNode(
    event: MouseEvent,
    direction: FLOW_DIRECTION,
    node: DataNode,
    colIndex: number,
    colCount: number
  ) {
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

    let newClass = Utilities.getRegClass(region, direction);

    // Following will still run multiple times.
    if (
      DragMgr._currDragOverId == currEl.id &&
      currEl.classList.contains(newClass)
    ) {
      DragMgr._updatePending = false;
      DragMgr._dragOverTime = new Date().getTime();
      return;
    }
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
    if (!DragMgr._updatePending) {
      return;
    } else {
      DragMgr._currDragOverId = currEl.id;
      DragMgr._updatePending = false;
      DragMgr._currReg = region;
    }

    // In case the elements are grouped.
    if (
      store.getState().displayState.groupBkmFol &&
      // checking if its a column (folder-view-col).
      Utilities.isElementInFolderColumn(currEl)
    ) {
      if (!currEl.classList.contains('bookmark')) {
        newClass = Utilities.getBetClass(newClass);
        DragMgr._addClassToEl(currEl, newClass);
        DragMgr._currReg = DRAG_REG.BET;
      } else {
        DragMgr._currReg = DRAG_REG.NUL;
      }

      DragMgr._cleanExistingClasses({ [newClass]: currEl.id });
      return;
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
            let prevClass = Utilities.getRegClass(DRAG_REG.AFT, direction);
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
            let nextClass = Utilities.getRegClass(DRAG_REG.BEF, direction);
            DragMgr._addClassToEl(el, nextClass);
            // el.classList.add(nextClass);
            exceptionData[nextClass] = el.id;
          }
        }
    }

    DragMgr._cleanExistingClasses(exceptionData);

    /**
     * So that a simultaneous drag-leave firing for reason
     * does not remove the classes.
     */
    DragMgr._dragOverTime = 0;
  }
  private static _addClassToEl(el: HTMLElement, className: string) {
    el.classList.add(className);
  }
  private static _addBeingDraggedClass(el: HTMLElement | null) {
    if (!el) return;

    el.tagName.toLowerCase() === 'a'
      ? el.classList.add('being-dragged')
      : el.parentElement && el.parentElement?.classList.add('being-dragged');
  }

  private static _getDragReg(
    event: MouseEvent,
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

  public static onDrop(event: Event) {
    DragMgr._cleanExistingClasses();

    /**
     * So that some timed out call to _updateElementClasses
     * does not add the classes after this.
     */
    DragMgr._updatePending = false;

    let dropId: string = (event.target as HTMLElement).id,
      newBefAftI: number | undefined = Infinity,
      targetNode = getNodeById(dropId);

    let dropOnSelf =
      DragMgr.selection.hasBkm(dropId) || DragMgr.selection.hasFol(dropId);

    if (dropOnSelf) {
      if (DragMgr._currReg === DRAG_REG.BET) {
        throw new Error('dropping into self...');
      }

      if (targetNode) {
        let el = document.getElementById(targetNode.id);
        el && DragMgr.noClick(el);
      }
    }

    // CHECK.
    if (!targetNode || !DragMgr._draggedElId) return;
    if (targetNode.index || targetNode.index == 0) {
      newBefAftI =
        DragMgr._currReg === DRAG_REG.BEF
          ? targetNode.index
          : targetNode.index + 1;
    }

    const elementsMoved: string[] = [];
    const moveElements = (target: {
      parentId: string;
      index: number | undefined;
    }) => {
      for (let id of DragMgr.selection.folders) {
        browserAPI.moveBk(id, target);
        elementsMoved.push(id);
      }
      for (let id of DragMgr.selection.bookmarks) {
        browserAPI.moveBk(id, target);
        elementsMoved.push(id);
      }
    };

    if (
      store.getState().displayState.groupBkmFol &&
      Utilities.isElementInFolderColumn(event.target as HTMLElement | null)
    ) {
      if (this._currReg !== DRAG_REG.BET) {
        this._currReg = DRAG_REG.NUL;
      }
    }

    switch (DragMgr._currReg) {
      case DRAG_REG.BEF:
      case DRAG_REG.AFT:
        // CHECK - is it really reqd. or just TS check.
        if (!targetNode.parentId) return;
        moveElements({
          parentId: targetNode.parentId,
          index: newBefAftI
        });
        break;
      case DRAG_REG.BET:
        moveElements({
          parentId: targetNode.id,
          index: undefined
        });
        break;
      case DRAG_REG.NUL:
        break;
    }

    store.dispatch(highlightElementsMoved(elementsMoved));
    store.dispatch(selectDeselectNode('', false));
  }

  public static onDragEnd() {
    let elList = document.getElementsByClassName('being-dragged');
    while (elList.length) elList[0].classList.remove('being-dragged');

    DragMgr._cleanExistingClasses();

    /**
     * Following clears the selection with one element. If this runs
     * before drop, drop wouldn't be able to find the element to move.
     * So its configured to run after it in the custom-drag-events.ts.
     */
    if (DragMgr.selection.total === 1) {
      store.dispatch(selectDeselectNode('', false));
    }
    store.dispatch(endDrag());
  }

  public static onDragLeave(e: MouseEvent) {
    e.stopPropagation();
    let dragLeaveTime = new Date().getTime();

    setTimeout(() => {
      if (DragMgr._dragOverTime && DragMgr._dragOverTime < dragLeaveTime)
        DragMgr._cleanExistingClasses();
    }, GLOBAL_SETTINGS.dragLeaveThreshold);
  }
}

export { DragMgr };
