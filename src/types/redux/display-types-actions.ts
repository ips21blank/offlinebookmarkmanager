import { DataBase } from '@scripts/data/db';
import { ACTIONS } from './action-types';
import { DISP_MODES, PAGE_TYPE } from '../state-types';
import { DataNode } from './bookmark-types-actions';
import { SelectionState } from '../script-types';

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
  prevPage: PAGE_TYPE; // Just to return from search.
}

interface FolPageData extends PageData {
  currLocation: string;
}
interface SetPageData extends PageData {}
interface SrhPageData extends FolPageData {
  querry: string;
  orderedNodes: DataNode[];
}
interface RecPageData extends PageData {}
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

interface BookmarkState {
  db: DataBase;
}

export type {
  DisplayAction,
  UpdateCurrLocation,
  ShowSearchPage,
  ShowPrevPage,
  UpdateColumnCount,
  DisplayState,
  SelectDeselectNode,
  BookmarkState,
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
