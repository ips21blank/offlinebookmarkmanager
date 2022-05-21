import { BrowserStorage, DataBase, getBkmData } from '@scripts/scripts';
import {
  BookmarkState,
  DataNode,
  DisplayState,
  DISP_MODES,
  FLOW_DIRECTION,
  FolPageData,
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

// BOOKMARKS

const ROOT_LOC = '0';

const initialStateBkm: BookmarkState = {
  db: new DataBase({ title: '', url: '', id: '', children: [] })
};

const getNodeById = (id: string) => initialStateBkm.db.get(id);
const getParentChain = (id: string) => initialStateBkm.db.getParentChain(id);

function updateBkmDataInitialState(data: DataNode) {
  initialStateBkm.db = new DataBase(data);
}

// DISPLAY

const initialStateDisp: DisplayState = {
  rootFolLocation: ROOT_LOC,
  noOfColumns: GLOBAL_SETTINGS.noOfCols,
  selection: SELECTION,
  mode: DISP_MODES.VIEW,
  dragId: '',
  elementsMoved: [],
  groupBkmFol: false,
  pageType: PAGE_TYPE.FOL,
  pageData: { currLocation: '', prevPage: PAGE_TYPE.FOL }
};
function updateDispInitialState(data: BrowserStorage) {
  initialStateDisp.groupBkmFol = data.getStorageData('groupBkmFol');
  (initialStateDisp.pageData as FolPageData).currLocation =
    data.getStorageData('homePin');
}

// SETTINGS

const initialStateSettings: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN,
  pins: ['1', '2', '3', '330', '446', '447', '161', '1574'],
  homePin: '',
  showFolBkmIcons: false
};
function updateSettingsInitialState(data: BrowserStorage) {
  initialStateSettings.flowDirection = data.getStorageData('flowDirection');
  initialStateSettings.pins = data.getStorageData('pins');
  initialStateSettings.homePin = data.getStorageData('homePin');
  initialStateSettings.showFolBkmIcons = data.getStorageData('showFolBkmIcons');
}

// OVERLAY

const initialOverlayState: OverlayState = {
  visible: false,
  type: OVERLAY_CLASSES.normal,
  overlayState: OVERLAY_STATES.blank
};

// Default data
// let defaultData = {
//   flowDirection: 1, // FLOW_DIRECTION.COLUMN,
//   pins: ['1', '2', '3', '330', '446', '447', '161', '1574'],
//   homePin: '446',
//   showFolBkmIcons: true,
//   groupBkmFol: false
// };

export {
  ROOT_LOC,
  initialStateBkm,
  initialStateDisp,
  initialStateSettings,
  initialOverlayState,
  getNodeById,
  getParentChain,
  updateBkmDataInitialState,
  updateDispInitialState,
  updateSettingsInitialState
};
