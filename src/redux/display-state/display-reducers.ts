import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  SelectDeselectNode,
  ACTIONS,
  StartDrag,
  HighlightElementsMoved
} from '@proj-types/types';
import { initialStateDisp } from '@redux/initial-states';

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

    case ACTIONS.START_DRAG: {
      let payload = (<StartDrag>action).payload;
      state.dragId = payload.nodeId;

      return { ...state };
    }

    case ACTIONS.END_DRAG: {
      return { ...state, dragId: '' };
    }

    case ACTIONS.ELEMENTS_MOVED: {
      let payload = (<HighlightElementsMoved>action).payload;
      return { ...state, elementsMoved: payload.idList };
    }

    default:
      return state;
  }
}

export { displayReducer };
