import { ACTIONS } from './action-types';

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

interface DisplayState {
  rootLocation: string;
  currLocation: string;
  noOfColumns: number;
}

export type {
  DisplayAction,
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayState
};
