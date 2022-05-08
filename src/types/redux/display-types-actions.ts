import { ACTIONS } from './action-types';
import { DISP_MODES, PAGE_TYPE } from '../state-types';
import { DataNode, SelectionState } from '../script-types';

// ACTIONS
type GenericPagePayload = { page: PAGE_TYPE };
interface DisplayAction {
  type: ACTIONS;
  payload: any;
}

interface SetPageAction extends DisplayAction {
  payload: GenericPagePayload;
}
interface UpdateCurrLocation extends SetPageAction {
  type: ACTIONS.SET_CURR_LOCATION;
  payload: { newLocation: string; page: PAGE_TYPE.FOL };
}
interface ShowSearchPage extends DisplayAction {
  type: ACTIONS.SHOW_SRH_PG;
  payload: {};
}
interface ShowDuplicatesPage extends DisplayAction {
  type: ACTIONS.SHOW_DUP_PG;
  payload: {};
}
interface ShowRecentPage extends DisplayAction {
  type: ACTIONS.SHOW_REC_PG;
  payload: { i: number; count: number };
}
interface ShowPrevPage extends DisplayAction {
  type: ACTIONS.SHOW_PREV_PG;
  payload: {};
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

interface ChangeEditMode extends DisplayAction {
  type: ACTIONS.TOGGLE_DISP_MODE;
  payload: { mode?: DISP_MODES };
}

interface ToggleDispGrouping extends DisplayAction {
  type: ACTIONS.TOGGLE_GROUPING;
  payload: {};
}

interface PageData {
  prevPage: PAGE_TYPE; // Just to return after search.
}

interface FolPageData extends PageData {
  currLocation: string;
}
interface SetPageData extends PageData {}
interface SrhPageData extends FolPageData {
  querry: string;
}
interface RecPageData extends PageData {
  i1: number;
  count: number;
}
interface DupPageData extends PageData {}

type PageDataTypes =
  | FolPageData
  | SetPageData
  | SrhPageData
  | RecPageData
  | DupPageData;

interface DisplayState {
  rootFolLocation: string;
  noOfColumns: number;
  selection: SelectionState;
  mode: DISP_MODES;
  dragId: string;
  elementsMoved: string[];
  groupBkmFol: boolean;
  pageType: PAGE_TYPE;
  pageData: PageDataTypes;
}

export type {
  DisplayAction,
  UpdateCurrLocation,
  ShowSearchPage,
  ShowRecentPage,
  ShowDuplicatesPage,
  ShowPrevPage,
  UpdateColumnCount,
  DisplayState,
  SelectDeselectNode,
  StartDrag,
  HighlightElementsMoved,
  EndDrag,
  ChangeEditMode,
  ToggleDispGrouping,
  FolPageData,
  SetPageData,
  SrhPageData,
  RecPageData,
  DupPageData
};
