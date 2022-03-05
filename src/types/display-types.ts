// Types related to the display state.

enum DISPLAY_ACTIONS {
  SET_CURR_LOCATION,
  SET_CURR_FOLDERS,
  UPDATE_COL_COUNT
}

interface DisplayAction {
  type: DISPLAY_ACTIONS;
  payload: any;
}

interface UpdateCurrLocation extends DisplayAction {
  type: DISPLAY_ACTIONS.SET_CURR_LOCATION;
  payload: { newLocation: string };
}

interface UpdateCurrFolders extends DisplayAction {
  type: DISPLAY_ACTIONS.SET_CURR_FOLDERS;
  payload: { newFolIds: string[] };
}

interface UpdateColumnCount extends DisplayAction {
  type: DISPLAY_ACTIONS.UPDATE_COL_COUNT;
  payload: { noOfColumns: number };
}

interface DisplayState {
  currLocation: string;
  currFolders: string[];
  noOfColumns: number;
}

export { DISPLAY_ACTIONS };
export type {
  DisplayAction,
  UpdateCurrLocation,
  UpdateCurrFolders,
  UpdateColumnCount,
  DisplayState
};
