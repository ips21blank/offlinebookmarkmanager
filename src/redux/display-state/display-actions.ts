import {
  UpdateCurrLocation,
  ACTIONS,
  UpdateColumnCount,
  SelectDeselectNode,
  StartDrag,
  EndDrag
} from '@proj-types/types';

function changeCurrLocation(newLocation: string): UpdateCurrLocation {
  return {
    type: ACTIONS.SET_CURR_LOCATION,
    payload: { newLocation }
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

export {
  changeCurrLocation,
  updateColumnCount,
  selectDeselectNode,
  startDrag,
  endDrag
};
