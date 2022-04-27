import { data } from '@scripts/test-data';
import { DataBase } from '@scripts/db';
import {
  DisplayState,
  DISP_MODES,
  FLOW_DIRECTION,
  OverlayState,
  Settings
} from '@proj-types/types';
import { OVERLAY_CLASSES, OVERLAY_STATES, SELECTION } from '@scripts/globals';

const ROOT_LOC = '0';

const initialStateBkm = { db: new DataBase(data) };
const getNodeById = (id: string) => initialStateBkm.db.get(id);
const getParentChain = (id: string) => initialStateBkm.db.getParentChain(id);

const initialStateDisp: DisplayState = {
  rootLocation: ROOT_LOC,
  currLocation: '1',
  noOfColumns: 4,
  selection: SELECTION,
  mode: DISP_MODES.VIEW,
  dragId: '',
  elementsMoved: [],
  groupBkmFol: false
};

const initialStateSettings: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN,
  pins: ['1', '2', '3', '330', '446', '447', '161', '1574'],
  homePin: undefined,
  showFolBkmIcons: true
};

const initialOverlayState: OverlayState = {
  visible: false,
  type: OVERLAY_CLASSES.normal,
  overlayState: OVERLAY_STATES.blank
};

export {
  ROOT_LOC,
  initialStateBkm,
  initialStateDisp,
  initialStateSettings,
  initialOverlayState,
  getNodeById,
  getParentChain
};
