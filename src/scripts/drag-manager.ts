import { DataNode, FLOW_DIRECTION } from '@proj-types/types';
import { getNodeById } from '@redux/initial-states';
import {
  DRAGTYPE,
  DRAG_REG,
  GLOBAL_SETTINGS,
  REG_CLASSES,
  getRegClass,
  SELECTION
} from './globals';
import { Utilities } from './utilities';
import { browserAPI } from './browser/browser-api';
import { store, selectDeselectNode } from '@redux/redux';

class DragMgr {
  public static selection = SELECTION;

  private static _dragOverTime?: number;

  private static _draggedElId?: string;
  private static _draggedElType?: DRAGTYPE;

  // The element on which some other element is being dragged.
  private static _currDragOverId?: string;
  private static _currReg: DRAG_REG;
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
      elType === DRAGTYPE.FULL_VIEW_HEADING
      // || DragMgr.selection.total < 2
    ) {
      return;
    }

    // When dragging multiple nodes.
    store.dispatch(selectDeselectNode(id, elType === DRAGTYPE.BKM, true));
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
      DragMgr._currDragOverId == currEl.id &&
      currEl.classList.contains(newClass)
    ) {
      DragMgr._updatePending = false;
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
      DragMgr._currDragOverClass = newClass;
      DragMgr._updatePending = false;
      DragMgr._currReg = region;
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

    let dropId: string = (e.target as HTMLElement).id,
      newBefAftI: number | undefined = Infinity,
      targetNode = getNodeById(dropId);

    if (
      DragMgr._currReg === DRAG_REG.BET &&
      (DragMgr.selection.hasBkm(dropId) || DragMgr.selection.hasFol(dropId))
    ) {
      throw new Error('dropping into self...');
    }

    if (!targetNode || !DragMgr._draggedElId) return;
    if (targetNode.index || targetNode.index == 0) {
      newBefAftI =
        DragMgr._currReg === DRAG_REG.BEF
          ? targetNode.index
          : targetNode.index + 1;
    }

    const moveElements = (target: {
      parentId: string;
      index: number | undefined;
    }) => {
      for (let id of DragMgr.selection.folders) {
        browserAPI.moveBk(id, target);
      }
      for (let id of DragMgr.selection.bookmarks) {
        browserAPI.moveBk(id, target);
      }
    };

    switch (DragMgr._currReg) {
      case DRAG_REG.BEF:
      case DRAG_REG.AFT:
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
    }

    store.dispatch(selectDeselectNode('', false));
  }

  // public static onDragEnd(
  //   e: DragEvent
  //   // currEl: HTMLElement | null
  // ) {
  //   e.stopPropagation();

  //   let elList = document.getElementsByClassName('being-dragged');
  //   while (elList.length) elList[0].classList.remove('being-dragged');

  //   DragMgr._cleanExistingClasses();
  // }
  // public static onDragLeave(e: DragEvent) {
  //   e.stopPropagation();
  //   let dragLeaveTime = new Date().getTime();

  //   setTimeout(() => {
  //     if (DragMgr._dragOverTime && DragMgr._dragOverTime < dragLeaveTime)
  //       DragMgr._cleanExistingClasses();
  //   }, GLOBAL_SETTINGS.dragSwitchThreshold);
  // }
}

export { DragMgr };
