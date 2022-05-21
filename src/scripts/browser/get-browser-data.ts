import { DataNode, STORE_KEYS, STORE_KEY_TYPE } from '@proj-types/types';
import { DEFAULT_ROOT_ID } from '@scripts/globals';
import { browserAPI } from './browser-api';
import { BrowserStorage } from './browser-storage';

async function getBkmData(): Promise<DataNode> {
  return new Promise<DataNode>((res, rej) => {
    browserAPI.getTree((data: DataNode[]) => {
      let tree: DataNode;

      if (!data) {
        rej('No bookmarks found');
        return;
      } else if (data.length === 1) {
        tree = data[0];
      } else {
        tree = { url: '', title: '', id: DEFAULT_ROOT_ID, children: data };
        for (let node of data) {
          if (!node.title) {
            node.title = 'Unnamed Root Bookmarks Node';
          }
        }
      }

      res(tree);
    });
  });
}

const BROWSER_DATA = {
  data: {} as BrowserStorage
};
async function loadStorageData(): Promise<BrowserStorage> {
  return new Promise((resolve) => {
    browserAPI.getLocal(STORE_KEYS, (data) => {
      BROWSER_DATA.data = new BrowserStorage(
        data as { [k in STORE_KEY_TYPE]: any }
      );
      resolve(BROWSER_DATA.data);
    });
  });
}

const getStorageData = () => BROWSER_DATA.data;

export { getBkmData, loadStorageData, getStorageData };
