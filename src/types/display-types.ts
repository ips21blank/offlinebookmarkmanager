import { ACTIONS } from './action-types';

interface SelectionState {
  folCount: number;
  bkmCount: number;
  folders: Set<string>;
  bookmarks: Set<string>;
}

interface DisplayAction {
  type: ACTIONS;
  payload: any;
}

interface UpdateCurrLocation extends DisplayAction {
  type: ACTIONS.SET_CURR_LOCATION;
  payload: { newLocation: string };
}

interface UpdateColumnCount extends DisplayAction {
  type: ACTIONS.UPDATE_COL_COUNT;
  payload: { noOfColumns: number };
}

interface SelectDeselectNode extends DisplayAction {
  type: ACTIONS.SELECT_DESELECT_NODE;
  payload: { nodeId: string; isBkm: boolean; deselect: boolean };
}

interface DisplayState {
  rootLocation: string;
  currLocation: string;
  noOfColumns: number;
  selection: SelectionState;
}

export type {
  DisplayAction,
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayState,
  SelectDeselectNode
};
