import {
  UpdateCurrLocation,
  UpdateCurrFolders,
  DISPLAY_ACTIONS,
  UpdateColumnCount
} from '@proj-types/display-types';

function changeCurrLocation(newLocation: string): UpdateCurrLocation {
  return {
    type: DISPLAY_ACTIONS.SET_CURR_LOCATION,
    payload: { newLocation }
  };
}

function changeCurrFolders(newFolIds: string[]): UpdateCurrFolders {
  return {
    type: DISPLAY_ACTIONS.SET_CURR_FOLDERS,
    payload: { newFolIds }
  };
}

function updateColumnCount(noOfColumns: number): UpdateColumnCount {
  let payload = { noOfColumns };
  if (isNaN(noOfColumns) || noOfColumns > 6 || noOfColumns < 1) {
    payload.noOfColumns = 0;
  }

  return {
    type: DISPLAY_ACTIONS.UPDATE_COL_COUNT,
    payload: payload
  };
}

export { changeCurrLocation, changeCurrFolders, updateColumnCount };