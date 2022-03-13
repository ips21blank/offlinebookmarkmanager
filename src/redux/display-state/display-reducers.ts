import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  ACTIONS,
  SelectDeselectNode
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
      let payload = (<SelectDeselectNode>action).payload;

      let selectionSet: Set<string>, counter: string;
      payload.isBkm
        ? (selectionSet = state.selection.bookmarks)
        : (selectionSet = state.selection.folders);

      if (payload.deselect && selectionSet.delete(payload.nodeId)) {
        payload.isBkm ? state.selection.bkmCount-- : state.selection.folCount--;
        DragMgr.dec();
      } else if (!selectionSet.has(payload.nodeId)) {
        selectionSet.add(payload.nodeId);
        payload.isBkm ? state.selection.bkmCount++ : state.selection.folCount++;
        DragMgr.inc();
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
