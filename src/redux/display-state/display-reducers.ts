import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  DISPLAY_ACTIONS
} from '@proj-types/display-types';
import { initialStateDisp } from '@redux/initial-states';
import { Utilities } from '@scripts/utilities';

function displayReducer(
  state: DisplayState = initialStateDisp,
  action: DisplayAction
): DisplayState {
  switch (action.type) {
    case DISPLAY_ACTIONS.SET_CURR_LOCATION: {
      let payload = (<UpdateCurrLocation>action).payload;

      return payload.newLocation === state.currLocation
        ? state
        : {
            ...state,
            currLocation: payload.newLocation
          };
    }

    case DISPLAY_ACTIONS.UPDATE_COL_COUNT: {
      let payload = (<UpdateColumnCount>action).payload;

      // Do nothing of noOfColumns is 0.
      return payload.noOfColumns && payload.noOfColumns !== state.noOfColumns
        ? { ...state, noOfColumns: payload.noOfColumns }
        : state;
    }

    default:
      return state;
  }
}

export { displayReducer };
