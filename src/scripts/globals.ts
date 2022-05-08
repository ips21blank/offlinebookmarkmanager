import { SelectionState } from '@proj-types/types';
import { Selection } from './selection';

const getREM: () => number = () => {
  let fs = getComputedStyle(document.documentElement).fontSize;
  return parseInt((fs.match(/\d+/g) as string[])[0]) || 14;
};

const GLOBAL_SETTINGS = {
  // CHANGES TO FOLLOWING MAY REQUIRE RELOADS.
  showIcons: true,
  dragMarginsPercentMin: 0.25,
  dragMarginsPercentMax: 0.75,
  minRowsPerCol: 5, // for row direction display.
  dragLeaveThreshold: 50,
  dragOverThreshold: 20,
  noOfCols: 4,

  dragStartThreshold: 0.3 * getREM(), // px
  rem: getREM(),

  ctxMenuRightTolerance: 14, // rem - taken from start to right edge.
  ctxMenuBottomTolenance: 2, // rem - from bottom edge to screen end.

  srhDelay: 500, // ms
  srhDispDelay: 300, // ms - added just for observation - how it seems.

  recentCountPerRow: 10
};

enum DRAGTYPE {
  BKM = 'BKM',
  FOL = 'FOL',
  FOLDER_PIN = 'FOLDER_PIN',
  FULL_VIEW_HEADING = 'FULL_VIEW_HEADING'
}

enum DROPTYPE {
  BKM,
  FOL,
  FOLDER_PIN,
  FULL_VIEW_CONTAINER
}

enum DRAG_REG {
  BEF,
  BET,
  AFT,
  NUL
}

const REG_CLASSES: { [key: string]: string } = {
  ROW_BEF: 'row-bef',
  ROW_BET: 'row-bet',
  ROW_AFT: 'row-aft',
  COL_BEF: 'col-bef',
  COL_BET: 'col-bet',
  COL_AFT: 'col-aft'
};

const SELECTION: SelectionState = new Selection();
const SELECT_CLASS = {
  SEL: 'selected',
  WAS_SEL: 'was-selected' // Simply for visual aid.
};

const ACCORDION_CLASSES = {
  folCol: 'folder-view-column'
};

const FOLDER_CLASSES = {
  EXP: 'expanded',
  COL: 'collapsed',
  FOL: 'folder',
  NO_EXP: 'do-not-expand',
  PIN_TITLE: 'pin-title'
};
const BKM_CLASSES = {
  BKM: 'bookmark'
};
const BEING_DRAGGED_CLASS = 'being-dragged';

const CUSTOM_EVENTS = {
  // Drag events.
  customDrag: new Event('customdrag'),
  customDrop: new Event('customdrop'),
  customEnd: new Event('customend'),

  // Context Menu events.
  nodeCtxMenu: new Event('node-contextmenu')
};

enum OVERLAY_CLASSES {
  transparent = 'transparent',
  normal = 'normal',

  info = 'info-popup',
  warn = 'warn-popup',

  confirm = 'confirm-popup'
}

enum OVERLAY_STATES {
  ctxMenu,
  popup,
  blank
}

export {
  GLOBAL_SETTINGS,
  DRAGTYPE,
  DROPTYPE,
  DRAG_REG,
  REG_CLASSES,
  SELECTION,
  SELECT_CLASS,
  FOLDER_CLASSES,
  BKM_CLASSES,
  BEING_DRAGGED_CLASS,
  CUSTOM_EVENTS,
  OVERLAY_CLASSES,
  OVERLAY_STATES,
  ACCORDION_CLASSES
};
