import {
  UpdateCurrLocation,
  ACTIONS,
  UpdateColumnCount,
  SelectDeselectNode,
  StartDrag,
  EndDrag,
  HighlightElementsMoved,
  ChangeEditMode,
  DISP_MODES,
  ToggleDispGrouping,
  ShowSearchPage,
  PAGE_TYPE,
  ShowPrevPage,
  ShowRecentPage,
  ShowDuplicatesPage,
  SilentlyRmvMinorClasses
} from '@proj-types/types';
import { GLOBAL_SETTINGS } from '@scripts/globals';

function changeCurrLocation(
  newLocation: string,
  showNode?: string
): UpdateCurrLocation {
  return {
    type: ACTIONS.SET_CURR_LOCATION,
    payload: { newLocation, page: PAGE_TYPE.FOL, showNode }
  };
}
function showSearchPage(): ShowSearchPage {
  return {
    type: ACTIONS.SHOW_SRH_PG,
    payload: {}
  };
}
function showRecentPage(): ShowRecentPage {
  return {
    type: ACTIONS.SHOW_REC_PG,
    payload: {
      i: 0,
      count: GLOBAL_SETTINGS.recentCountPerRow * GLOBAL_SETTINGS.noOfCols
    }
  };
}
function showDuplicatesPage(): ShowDuplicatesPage {
  return {
    type: ACTIONS.SHOW_DUP_PG,
    payload: {}
  };
}
function showPrevPage(): ShowPrevPage {
  return {
    type: ACTIONS.SHOW_PREV_PG,
    payload: {}
  };
}

function updateColumnCount(noOfColumns: number): UpdateColumnCount {
  let payload = { noOfColumns };
  if (isNaN(noOfColumns) || noOfColumns > 6 || noOfColumns < 1) {
    payload.noOfColumns = 0;
  }

  return {
    type: ACTIONS.UPDATE_COL_COUNT,
    payload: payload
  };
}

function selectDeselectNode(
  nodeId: string,
  isBkm: boolean,
  doNotDeselect?: boolean
): SelectDeselectNode {
  return {
    type: ACTIONS.SELECT_DESELECT_NODE,
    payload: { nodeId, isBkm, doNotDeselect }
  };
}

function startDrag(nodeId: string): StartDrag {
  return { type: ACTIONS.START_DRAG, payload: { nodeId } };
}

function endDrag(): EndDrag {
  return { type: ACTIONS.END_DRAG, payload: null };
}

function highlightElementsMoved(idList: string[]): HighlightElementsMoved {
  return { type: ACTIONS.ELEMENTS_MOVED, payload: { idList } };
}

function toggleDispMode(mode?: DISP_MODES): ChangeEditMode {
  return { type: ACTIONS.TOGGLE_DISP_MODE, payload: { mode } };
}

function toggleGrouping(): ToggleDispGrouping {
  return { type: ACTIONS.TOGGLE_GROUPING, payload: {} };
}

function silentlyRmvMinorClasses(): SilentlyRmvMinorClasses {
  return { type: ACTIONS.RMV_MINOR_CLASSES, payload: {} };
}

export {
  changeCurrLocation,
  showSearchPage,
  showRecentPage,
  showDuplicatesPage,
  showPrevPage,
  updateColumnCount,
  selectDeselectNode,
  startDrag,
  highlightElementsMoved,
  endDrag,
  toggleDispMode,
  toggleGrouping,
  silentlyRmvMinorClasses
};
