import { data } from '@scripts/test-data';
import { DataBase } from '@scripts/db';
import { DisplayState, FLOW_DIRECTION, Settings } from '@proj-types/types';

const ROOT_LOC = '0';

const initialStateBkm = { db: new DataBase(data) };
const getNodeById = (id: string) => initialStateBkm.db.get(id);
const getParentChain = (id: string) => initialStateBkm.db.getParentChain(id);

const initialStateDisp: DisplayState = {
  rootLocation: ROOT_LOC,
  currLocation: '446',
  noOfColumns: 4,
  selection: {
    folCount: 0,
    bkmCount: 0,
    folders: new Set<string>(),
    bookmarks: new Set<string>()
  }
};
const getCount = () =>
  initialStateDisp.selection.folCount + initialStateDisp.selection.bkmCount;

const initialStateSettings: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN,
  pins: ['1', '2', '3', '330', '446', '447', '161'],
  homePin: undefined,
  showFolBkmIcons: true
};

export {
  ROOT_LOC,
  initialStateBkm,
  initialStateDisp,
  initialStateSettings,
  getNodeById,
  getParentChain,
  getCount
};
