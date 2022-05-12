import { DataNode, FLOW_DIRECTION, PAGE_TYPE } from '@proj-types/types';
import { getNodeById } from '@redux/initial-states';
import {
  DRAGTYPE,
  DRAG_REG,
  GLOBAL_SETTINGS,
  REG_CLASSES,
  SELECTION,
  FOLDER_CLASSES,
  ACCORDION_CLASSES,
  BKM_CLASSES,
  BEING_DRAGGED_CLASS,
  BEING_DRAGGED_OVER
} from '../globals';
import { Utilities } from '../utilities';
import { browserAPI } from '../browser/browser-api';
import {
  store,
  selectDeselectNode,
  startDrag,
  endDrag,
  highlightElementsMoved,
  showInfoPopup,
  movPin,
  pinFolder
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
    if (store.getState().displayState.pageType === PAGE_TYPE.REC) return;

    let currEl = event.target as HTMLElement;

    if (currEl && DragMgr._draggedElId === currEl.id) {
      DragMgr.cleanExistingClasses();
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
  public static onDragoverPin(
    event: MouseEvent,
    pins: string[],
    dragType: DRAGTYPE
  ) {
    let prevClass = '',
      currClass = '',
      nextClass = '';

    let prevEl: HTMLElement | null = null,
      currEl = event.target as HTMLElement,
      nextEl: HTMLElement | null = null;

    let iCurr = pins.indexOf(Utilities.parsePinId(currEl.id));
    if (iCurr === -1 || DragMgr._draggedElId === currEl.id) {
      DragMgr.cleanExistingClasses();
      return;
    }

    if (dragType !== DRAGTYPE.FOLDER_PIN) {
      DragMgr.cleanExistingClasses();
      DragMgr._addClassToEl(currEl, REG_CLASSES.COL_BET);
      return;
    }

    let region = DragMgr._getDragReg(
      event,
      currEl.getBoundingClientRect(),
      FLOW_DIRECTION.COLUMN,
      // Treat as anchor el if dragged el is also a pin.
      dragType === DRAGTYPE.FOLDER_PIN // will be true.
    );

    const getEl = (id: string) =>
      document.getElementById(Utilities.getPinId(id));
    // prettier-ignore
    switch (region) {
      case DRAG_REG.BEF:
        prevClass = REG_CLASSES.COL_AFT; currClass = REG_CLASSES.COL_BEF;
        iCurr && (prevEl = getEl(pins[iCurr - 1]));
        break;
      case DRAG_REG.BET: // should not happen.
        currClass = REG_CLASSES.COL_BET;
        break;
      case DRAG_REG.AFT:
        currClass = REG_CLASSES.COL_AFT; nextClass = REG_CLASSES.COL_BEF;
        (iCurr < pins.length - 1) && (nextEl = getEl(pins[iCurr + 1]));
        break;
    }

    if (
      DragMgr._currDragOverId == currEl.id &&
      currEl.classList.contains(currClass)
    ) {
      DragMgr._updatePending = false;
      DragMgr._dragOverTime = new Date().getTime();
      return;
    }
    DragMgr._updatePending = true;

    DragMgr._updatePinClasses(currEl.id, region, [
      { el: prevEl, cl: prevClass },
      { el: currEl, cl: currClass },
      { el: nextEl, cl: nextClass }
    ]);
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

    // In case the elements are grouped or page has special dragging behaviour.
    const displayState = store.getState().displayState;
    if (
      (displayState.groupBkmFol || displayState.pageType === PAGE_TYPE.SRH) &&
      // checking if its a column (folder-view-col).
      Utilities.isElementInFolderColumn(currEl)
    ) {
      if (!currEl.classList.contains(BKM_CLASSES.BKM)) {
        newClass = Utilities.getBetClass(newClass);
        DragMgr._addClassToEl(currEl, newClass);
        DragMgr._currReg = DRAG_REG.BET;
      } else {
        DragMgr._currReg = DRAG_REG.NUL;
      }

      DragMgr.cleanExistingClasses({ [newClass]: currEl.id });
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

    DragMgr.cleanExistingClasses(exceptionData);

    /**
     * So that a simultaneous drag-leave firing for reason
     * does not remove the classes.
     */
    DragMgr._dragOverTime = 0;
  }
  private static _updatePinClasses(
    currId: string,
    dragReg: DRAG_REG,
    elements: { cl: string; el: HTMLElement | null }[]
  ) {
    if (!DragMgr._updatePending) {
      return;
    } else {
      DragMgr._currDragOverId = currId;
      DragMgr._updatePending = false;
      DragMgr._currReg = dragReg;
    }

    let exceptionData: any = {};
    for (let el of elements) {
      if (el.el && el.cl) {
        el.el.classList.add(el.cl);
        exceptionData[el.cl] = el.el.id;
      }
    }

    DragMgr.cleanExistingClasses(exceptionData);
    DragMgr._dragOverTime = 0;
  }
  private static _addClassToEl(el: HTMLElement, className: string) {
    !el.classList.contains(className) && el.classList.add(className);
  }
  private static _addBeingDraggedClass(el: HTMLElement | null) {
    if (!el) return;

    el.tagName.toLowerCase() === 'a'
      ? el.classList.add(BEING_DRAGGED_CLASS)
      : el.parentElement &&
        el.parentElement?.classList.add(BEING_DRAGGED_CLASS);
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
  public static cleanExistingClasses(exceptionData?: {
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
    DragMgr.cleanExistingClasses();
    if (store.getState().displayState.pageType === PAGE_TYPE.REC) return;

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
        if (
          DragMgr._draggedElId &&
          !DragMgr.selection.hasBkm(DragMgr._draggedElId)
        ) {
          store.dispatch(
            showInfoPopup({
              title: 'Dropping on itself',
              text: 'Cannot drop the selection onto a folder that was selected as well.'
            })
          );
        }
        return;
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

    if (
      store.getState().displayState.groupBkmFol &&
      Utilities.isElementInFolderColumn(event.target as HTMLElement | null)
    ) {
      if (this._currReg !== DRAG_REG.BET) {
        this._currReg = DRAG_REG.NUL;
      }
    }

    const elementsMoved: string[] = [];
    switch (DragMgr._currReg) {
      case DRAG_REG.BEF:
      case DRAG_REG.AFT:
        // CHECK - is it really reqd. or just TS check.
        if (!targetNode.parentId) return;
        DragMgr._moveElementsToFol(
          {
            parentId: targetNode.parentId,
            index: newBefAftI
          },
          elementsMoved
        );
        break;
      case DRAG_REG.BET:
        DragMgr._moveElementsToFol(
          {
            parentId: targetNode.id,
            index: undefined
          },
          elementsMoved
        );
        break;
      case DRAG_REG.NUL:
        break;
    }

    DragMgr._highlightMovedAndDeselect(elementsMoved);
  }
  public static dropOnPin(event: Event, dragType: DRAGTYPE, pins: string[]) {
    DragMgr._updatePending = false;
    DragMgr.cleanExistingClasses();

    let targetEl = event.target as HTMLElement;
    let targetId = Utilities.parsePinId(targetEl.id);
    if (targetId === DragMgr._draggedElId || !DragMgr._draggedElId || !targetId)
      return;

    if (dragType !== DRAGTYPE.FOLDER_PIN) {
      let elementsMoved: string[] = [];
      DragMgr._moveElementsToFol(
        { parentId: targetId, index: undefined },
        elementsMoved
      );

      DragMgr._highlightMovedAndDeselect(elementsMoved);
      return;
    }

    let newIndex: number,
      iTarget = pins.indexOf(targetId);
    if (DragMgr._currReg === DRAG_REG.BEF) {
      newIndex = iTarget;
    } else {
      newIndex = iTarget + 1;
    }

    store.dispatch(
      movPin(Utilities.parsePinId(DragMgr._draggedElId), newIndex)
    );
  }
  public static dropOnPinContainer(event: Event, dragType: DRAGTYPE) {
    if (dragType !== DRAGTYPE.FOL) return;

    if (DragMgr._draggedElId) {
      let node = getNodeById(DragMgr._draggedElId);
      node && store.dispatch(pinFolder(node));
    }
  }
  private static _highlightMovedAndDeselect(elementsMoved: string[]) {
    store.dispatch(highlightElementsMoved(elementsMoved));
    store.dispatch(selectDeselectNode('', false));
  }
  private static _moveElementsToFol = (
    target: {
      parentId: string;
      index: number | undefined;
    },
    elementsMoved: string[] = []
  ) => {
    for (let id of DragMgr.selection.folders) {
      browserAPI.moveBk(id, target);
      elementsMoved.push(id);
    }
    for (let id of DragMgr.selection.bookmarks) {
      browserAPI.moveBk(id, target);
      elementsMoved.push(id);
    }
  };

  public static onDragEnd() {
    let elList = document.getElementsByClassName(BEING_DRAGGED_CLASS);
    while (elList.length) elList[0].classList.remove(BEING_DRAGGED_CLASS);

    elList = document.getElementsByClassName(BEING_DRAGGED_OVER);
    while (elList.length) elList[0].classList.remove(BEING_DRAGGED_OVER);

    DragMgr.cleanExistingClasses();

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
        DragMgr.cleanExistingClasses();
    }, GLOBAL_SETTINGS.dragLeaveThreshold);
  }
}

export { DragMgr };
