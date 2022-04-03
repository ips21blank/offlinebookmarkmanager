import { DataNode } from '@proj-types/types';

let maxId = 50000;

const BrowserSimulator = {
  bookmarks: {
    update: (
      id: string,
      changes: {
        title?: string | undefined;
        url?: string | undefined;
      },
      cb: any
    ): any => (<any>BrowserSimulator.bookmarks.onChanged.listener)(id, changes),
    onChanged: {
      listener: () => {},
      addListener: (cb: any) => {
        BrowserSimulator.bookmarks.onChanged.listener = cb;
      }
    },
    move: (
      id: string,
      targetObjectName: { parentId: string; index?: number },
      cb: any
    ): any =>
      (<any>BrowserSimulator.bookmarks.onMoved.listener)(id, targetObjectName),
    onMoved: {
      listener: () => {},
      addListener: (cb: any) => {
        BrowserSimulator.bookmarks.onMoved.listener = cb;
      }
    },
    remove: (id: string, cb: any): any =>
      (<any>BrowserSimulator.bookmarks.onRemoved.listener)(id),
    onRemoved: {
      listener: () => {},
      addListener: (cb: any) => {
        BrowserSimulator.bookmarks.onRemoved.listener = cb;
      }
    },
    removeTree: (id: string, cb: any): any =>
      (<any>BrowserSimulator.bookmarks.onRemovedTr.listener)(id),
    onRemovedTr: {
      listener: () => {},
      addListener: (cb: any) => {
        BrowserSimulator.bookmarks.onRemoved.listener = cb;
      }
    },
    create: (
      createData: {
        title?: string;
        url?: string;
        parentId?: string;
        index?: number;
      },
      cb: any
    ): any =>
      (<any>BrowserSimulator.bookmarks.onCreated.listener)(maxId++, <DataNode>{
        title: createData.title,
        url: createData.url,
        parentId: createData.parentId,
        id: String(maxId),
        index: createData.index
      }),
    onCreated: {
      listener: () => {},
      addListener: (cb: any) => {
        BrowserSimulator.bookmarks.onCreated.listener = cb;
      }
    }
  }
};

export { BrowserSimulator };
