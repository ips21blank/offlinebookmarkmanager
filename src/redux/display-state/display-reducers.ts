import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  DISPLAY_ACTIONS,
  UpdateCurrFolders
} from '@proj-types/display-types';
import { Utilities } from '@scripts/utilities';

const initialState: DisplayState = {
  currLocation: '1',
  currFolders: ['1'],
  noOfColumns: 4
};

function displayReducer(
  state: DisplayState = initialState,
  action: DisplayAction
): DisplayState {
  switch (action.type) {
    case DISPLAY_ACTIONS.SET_CURR_LOCATION: {
      let newLocation = (<UpdateCurrLocation>action).payload.newLocation;

      return newLocation === state.currLocation
        ? state
        : { ...state, currLocation: newLocation };
    }

    case DISPLAY_ACTIONS.SET_CURR_FOLDERS: {
      let newFolIds = (<UpdateCurrFolders>action).payload.newFolIds;

      return Utilities.areArraysSame(newFolIds, state.currFolders)
        ? state
        : { ...state, currFolders: newFolIds };
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
