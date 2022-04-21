import { DataBase } from '@scripts/db';
import { ACTIONS } from './action-types';
import { SelectionState } from './script-types';
import { DISP_MODES } from './settings-types-actions';

// ACTIONS

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
  payload: { nodeId: string; isBkm: boolean; doNotDeselect?: boolean };
}

interface StartDrag extends DisplayAction {
  type: ACTIONS.START_DRAG;
  payload: { nodeId: string };
}

interface EndDrag extends DisplayAction {
  type: ACTIONS.END_DRAG;
  payload: null;
}

interface HighlightElementsMoved extends DisplayAction {
  type: ACTIONS.ELEMENTS_MOVED;
  payload: { idList: string[] };
}

interface DisplayState {
  rootLocation: string;
  currLocation: string;
  noOfColumns: number;
  selection: SelectionState;
  mode: DISP_MODES;
  dragId: string;
  elementsMoved: string[];
  groupBkmFol: boolean;
}

interface BookmarkState {
  db: DataBase;
}

export type {
  DisplayAction,
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayState,
  SelectDeselectNode,
  BookmarkState,
  StartDrag,
  HighlightElementsMoved,
  EndDrag
};
