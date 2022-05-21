import { DataBase, getBkmData } from '@scripts/scripts';
import {
  BookmarkState,
  DisplayState,
  DISP_MODES,
  FLOW_DIRECTION,
  OverlayState,
  PAGE_TYPE,
  Settings
} from '@proj-types/types';
import {
  GLOBAL_SETTINGS,
  OVERLAY_CLASSES,
  OVERLAY_STATES,
  SELECTION
} from '@scripts/globals';

const ROOT_LOC = '0';

const initialStateBkm: BookmarkState = {
  db: new DataBase({ title: '', url: '', id: '', children: [] })
};
const getNodeById = (id: string) => initialStateBkm.db.get(id);
const getParentChain = (id: string) => initialStateBkm.db.getParentChain(id);

async function updateBkmDataInitialState() {
  const data = await getBkmData();

  initialStateBkm.db = new DataBase(data);

  return { initialStateBkm, getNodeById, getParentChain };
}

const initialStateDisp: DisplayState = {
  rootFolLocation: ROOT_LOC,
  noOfColumns: GLOBAL_SETTINGS.noOfCols,
  selection: SELECTION,
  mode: DISP_MODES.VIEW,
  dragId: '',
  elementsMoved: [],
  groupBkmFol: false,
  pageType: PAGE_TYPE.FOL,
  pageData: { currLocation: '446', prevPage: PAGE_TYPE.FOL }
};

const initialStateSettings: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN,
  pins: ['1', '2', '3', '330', '446', '447', '161', '1574'],
  homePin: '',
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
  getParentChain,
  updateBkmDataInitialState
};
