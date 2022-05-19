import { data } from '../test-data';

async function getBkmData(): Promise<chrome.bookmarks.BookmarkTreeNode> {
  return data;
}

export { getBkmData };
