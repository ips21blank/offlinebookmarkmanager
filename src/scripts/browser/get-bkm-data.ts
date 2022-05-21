import { DataNode } from '@proj-types/types';
import { DEFAULT_ROOT_ID } from '@scripts/globals';
import { browserAPI } from '../browser/browser-api';

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

export { getBkmData };
