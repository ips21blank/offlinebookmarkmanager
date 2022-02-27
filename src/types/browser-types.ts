export type DataNode = chrome.bookmarks.BookmarkTreeNode;

export enum BR_ACTIONS_TYPES {
  REMOVE,
  MOVE,
  CHANGE,
  REORDER,
  CREATE
}

// export enum BR_EVENTS_TYPE {
//   REMOVED,
//   MOVED,
//   CHANGED,
//   REORDERED,
//   CREATED,
//   IMPORT_ENDED,
//   IMPORT_STARTED
// }

// Different types:-
type _RmInfo = chrome.bookmarks.BookmarkRemoveInfo;
type _MvInfo = chrome.bookmarks.BookmarkMoveInfo;
type _ChInfo = chrome.bookmarks.BookmarkChangeInfo;
type _RoInfo = chrome.bookmarks.BookmarkReorderInfo;
type _CrInfo = chrome.bookmarks.BookmarkTreeNode;

// Remove
// chrome.bookmarks.onRemoved.addListener;
export interface NodeRemoveAction {
  type: BR_ACTIONS_TYPES.REMOVE;
  payload: _RmInfo;
}
export type NodeRemoveEvHandler = (id: string, removeInfo: _RmInfo) => void;

// Move
// chrome.bookmarks.onMoved.addListener;
export interface NodeMoveAction {
  type: BR_ACTIONS_TYPES.MOVE;
  payload: _MvInfo;
}
export type NodeMovedEvHandler = (id: string, moveInfo: _MvInfo) => void;

// Change
// chrome.bookmarks.onChanged.addListener;
export interface NodeChangeAction {
  type: BR_ACTIONS_TYPES.CHANGE;
  payload: _ChInfo;
}
export type NodeChangedEvHandler = (id: string, changeInfo: _ChInfo) => void;

// Reorder
// chrome.bookmarks.onChildrenReordered.addListener;
export interface NodesReorderedAction {
  type: BR_ACTIONS_TYPES.REORDER;
  payload: _RoInfo;
}
export type NodesReorderEvHandler = (id: string, reorderInfo: _RoInfo) => void;

// Create
// chrome.bookmarks.onCreated.addListener;
export interface NodeCreateAction {
  type: BR_ACTIONS_TYPES.CREATE;
  payload: _CrInfo;
}
export type NodeCreatedEvHandler = (id: string, bookmark: _CrInfo) => void;

// Import - start/end
// chrome.bookmarks.onImportBegan.addListener;
export type ImportBeganEvHandler = () => void;
// chrome.bookmarks.onImportEnded.addListener;
export type ImportEndedEvHandler = () => void;

export type BrowserAction =
  | NodeRemoveAction
  | NodeMoveAction
  | NodeChangeAction
  | NodesReorderedAction;
