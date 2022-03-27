import { DataNode } from '@proj-types/browser-types';
import { getParentChain } from '@redux/initial-states';
import { BrowserSimulator as chrome } from './mock-browser';

const browserAPI = {
  getBkmIconSrc(url?: string): string {
    return url ? 'someImgUrl' : '';
  },

  // store(keyValPairs: any, callBack = () => {}) {
  //   chrome.storage.local.set(keyValPairs, callBack);
  // },

  // rmvId(id: string, callBack = () => {}) {
  //   chrome.storage.local.remove(id, callBack);
  // },
  // rmvIds(ids: string[], callBack = () => {}) {
  //   chrome.storage.local.remove(ids, callBack);
  // },
  update(
    id: string,
    changes: chrome.bookmarks.BookmarkChangesArg,
    callBack = (res: DataNode) => {}
  ) {
    // changes - title? and url?
    chrome.bookmarks.update(id, changes, callBack);
  },
  // getNode(id: string, callBack = (results: DataNode[]) => {}) {
  //   chrome.bookmarks.get(id, callBack);
  // },
  // getCh(id: string, callBack = (results: DataNode[]) => {}) {
  //   chrome.bookmarks.getChildren(id, callBack);
  // },
  // getSubT(id: string, callBack = (results: DataNode[]) => {}) {
  //   chrome.bookmarks.getSubTree(id, callBack);
  // },
  moveBk(
    id: string,
    target: { parentId: string; index?: number },
    callBack = () => {}
  ) {
    let parentChain: DataNode[] = getParentChain(target.parentId);

    if (parentChain.findIndex((node) => node.id === id) !== -1) {
      throw new Error('Trying to move a folder within itself.'); // REMOVE : IT STOPS THE EXECUTION!!!
      // document.body.appendChild(
      //   _el.info('You cannot place a folder within itself.').blanket
      // );
    } else {
      chrome.bookmarks.move(id, target, callBack);
    }
  },
  // recentBk(n: number, callBack = (results: DataNode[]) => {}) {
  //   chrome.bookmarks.getRecent(n, callBack);
  // },
  removeBk(id: string, callBack = () => {}) {
    chrome.bookmarks.remove(id, callBack);
  },
  // removeTr(id: string, callBack = () => {}) {
  //   chrome.bookmarks.removeTree(id, callBack);
  // },
  // getLocal(
  //   keys: string | string[],
  //   callBack = (items: { [key: string]: any }) => {}
  // ) {
  //   chrome.storage.local.get(keys, callBack);
  // },
  // getTree(callBack: (results: DataNode[]) => void) {
  //   chrome.bookmarks.getTree(callBack);
  // },
  // mkTab	: function(o, cb){     chrome.tabs.create(o, function(tab){ if(cb) cb(tab); }); },
  createBk(
    createData: { title?: string; url?: string; parentId?: string },
    callBack = (res: DataNode) => {}
  ) {
    chrome.bookmarks.create(createData, callBack);
  }
};

// Browser Events.

const browserEventsAPI = {
  create(callback: (id: string, bookmark: DataNode) => void) {
    // when a bookmark or a folder is created.
    chrome.bookmarks.onCreated.addListener(callback);
  },
  remove(
    callback: (
      id: string,
      removeInfo: chrome.bookmarks.BookmarkRemoveInfo
    ) => void
  ) {
    // when a bookmark or a folder is deleted.
    chrome.bookmarks.onRemoved.addListener(callback);
  },
  edit(
    callback: (
      id: string,
      changeInfo: chrome.bookmarks.BookmarkChangeInfo
    ) => void
  ) {
    // when a bookmark or a folder is edited.
    chrome.bookmarks.onChanged.addListener(callback);
  },
  move(
    callback: (id: string, moveInfo: chrome.bookmarks.BookmarkMoveInfo) => void
  ) {
    // when a bookmark or a folder is moved.
    chrome.bookmarks.onMoved.addListener(callback);
  }
  // chReord(
  //   callback: (
  //     id: string,
  //     reorderInfo: chrome.bookmarks.BookmarkReorderInfo
  //   ) => void
  // ) {
  //   // when the children of bookmarks of folders are reordered.
  //   chrome.bookmarks.onChildrenReordered.addListener(callback);
  // },
  // impEnd(callback: () => void) {
  //   // when import ends.
  //   chrome.bookmarks.onImportEnded.addListener(callback);
  // }
  // store(
  //   callback: (
  //     changes: {
  //       [key: string]: chrome.storage.StorageChange;
  //     },
  //     areaName: 'sync' | 'local' | 'managed'
  //   ) => void
  // ) {
  //   chrome.storage.onChanged.addListener(callback);
  // }
};

export { browserAPI, browserEventsAPI };
