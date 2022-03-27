import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  SelectDeselectNode,
  ACTIONS
} from '@proj-types/types';
import { initialStateDisp } from '@redux/initial-states';
import { DragMgr } from '@scripts/drag-manager';

function displayReducer(
  state: DisplayState = initialStateDisp,
  action: DisplayAction
): DisplayState {
  switch (action.type) {
    case ACTIONS.SET_CURR_LOCATION: {
      let payload = (<UpdateCurrLocation>action).payload;

      return payload.newLocation === state.currLocation
        ? state
        : {
            ...state,
            currLocation: payload.newLocation
          };
    }

    case ACTIONS.UPDATE_COL_COUNT: {
      let payload = (<UpdateColumnCount>action).payload;

      // Do nothing of noOfColumns is 0.
      return payload.noOfColumns && payload.noOfColumns !== state.noOfColumns
        ? { ...state, noOfColumns: payload.noOfColumns }
        : state;
    }

    case ACTIONS.SELECT_DESELECT_NODE: {
      let payload = (<SelectDeselectNode>action).payload,
        id = payload.nodeId,
        sel = state.selection;

      if (!id) {
        sel.clear();
      } else if (payload.isBkm) {
        sel.addBkm(id) || (!payload.doNotDeselect && sel.rmvBkm(id));
      } else {
        sel.addFol(id) || (!payload.doNotDeselect && sel.rmvFol(id));
      }

      // The bookmarks or folders are supposed to keep track of whether they
      // have been selected or not. The reference however is updated to update
      // dragElement.
      // This aspect of their state is not updated using store. Store is used
      // to simply keep data to be used by different functions.
      return { ...state };
    }

    default:
      return state;
  }
}

export { displayReducer };
