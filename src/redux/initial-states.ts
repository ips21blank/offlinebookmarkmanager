import { data } from '@scripts/test-data';
import { DataBase } from '@scripts/db';
import { DisplayState, FLOW_DIRECTION, Settings } from '@proj-types/types';

const ROOT_LOC = '0';

const initialStateDB = new DataBase(data);
console.log(initialStateDB);
const initialStateDisp: DisplayState = {
  rootLocation: ROOT_LOC,
  currLocation: ROOT_LOC,
  noOfColumns: 4
};
const initialStateSettings: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN,
  pins: ['1', '2', '3', '330', '446', '447', '161'],
  homePin: undefined,
  showFolBkmIcons: true
};

export { initialStateDB, initialStateDisp, initialStateSettings };
