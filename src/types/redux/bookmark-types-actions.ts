import { ACTIONS } from './action-types';

export type DataNode = chrome.bookmarks.BookmarkTreeNode;

// Aliases for different types:-
type _RmInfo = chrome.bookmarks.BookmarkRemoveInfo;
type _MvInfo = chrome.bookmarks.BookmarkMoveInfo;
type _ChInfo = chrome.bookmarks.BookmarkChangeInfo;
type _RoInfo = chrome.bookmarks.BookmarkReorderInfo;
type _CrInfo = chrome.bookmarks.BookmarkTreeNode;

export interface BookmarkAction {
  type: ACTIONS;
  payload: any;
}

// Remove
// chrome.bookmarks.onRemoved.addListener;
export interface NodeRemoveAction extends BookmarkAction {
  type: ACTIONS.REMOVE;
  payload: { id: string };
  // payload: _RmInfo; // not required by the DataBase.
}
export type NodeRemoveEvHandler = (id: string, removeInfo: _RmInfo) => void;

// Move
// chrome.bookmarks.onMoved.addListener;
export interface NodeMoveAction extends BookmarkAction {
  type: ACTIONS.MOVE;
  payload: { id: string; newParentId: string; index?: number };
  // payload: _MvInfo;
}
export type NodeMovedEvHandler = (id: string, moveInfo: _MvInfo) => void;

// Change
// chrome.bookmarks.onChanged.addListener;
export interface NodeChangeAction extends BookmarkAction {
  type: ACTIONS.CHANGE;
  payload: { id: string; url: string | undefined; title: string | undefined };
}
export type NodeChangedEvHandler = (id: string, changeInfo: _ChInfo) => void;

// Reorder
// chrome.bookmarks.onChildrenReordered.addListener;
export interface NodesReorderedAction extends BookmarkAction {
  type: ACTIONS.REORDER;
  payload: { id: string; childIds: string[] };
}
export type NodesReorderEvHandler = (id: string, reorderInfo: _RoInfo) => void;

// Create
// chrome.bookmarks.onCreated.addListener;
export interface NodeCreateAction extends BookmarkAction {
  type: ACTIONS.CREATE;
  payload: { id: string; node: DataNode };
}
export type NodeCreatedEvHandler = (id: string, bookmark: _CrInfo) => void;

// Import - start/end
// chrome.bookmarks.onImportBegan.addListener;
export type ImportBeganEvHandler = () => void;
// chrome.bookmarks.onImportEnded.addListener;
export type ImportEndedEvHandler = () => void;
