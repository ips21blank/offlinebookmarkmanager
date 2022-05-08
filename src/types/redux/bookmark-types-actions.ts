import {
  DataNode,
  NodeScoreData,
  BookmarkTree,
  NodeSearchResult
} from '../script-types';
import { ACTIONS } from './action-types';

// Aliases for different types:-
type _RmInfo = chrome.bookmarks.BookmarkRemoveInfo;
type _MvInfo = chrome.bookmarks.BookmarkMoveInfo;
type _ChInfo = chrome.bookmarks.BookmarkChangeInfo;
type _RoInfo = chrome.bookmarks.BookmarkReorderInfo;
type _CrInfo = chrome.bookmarks.BookmarkTreeNode;

/**
 * BOOKMAKR ACTIONS
 */

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

/**
 * OTHER ACTIONS
 */

export interface SearchNodes extends BookmarkAction {
  type: ACTIONS.BKM_SRH;
  payload: { id: string; q: string };
}
export interface RefreshSearch extends BookmarkAction {
  type: ACTIONS.BKM_SRH_REF;
  payload: {};
}

export interface DuplicatesSearch extends BookmarkAction {
  type: ACTIONS.BKM_DUP;
  payload: { ignoreHash: boolean };
}

export interface BookmarkState {
  db: BookmarkTree;
  searchPromise?: Promise<NodeSearchResult>;
  duplicatesPromise?: Promise<DataNode[][]>;
}
