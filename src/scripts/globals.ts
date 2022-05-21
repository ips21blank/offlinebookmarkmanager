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
  rowWidth: 20, // rem
  sideContentWidth: 24, // rem

  dragStartThreshold: 0.3 * getREM(), // px
  rem: getREM(),

  ctxMenuRightTolerance: 14, // rem - taken from start to right edge.
  ctxMenuBottomTolenance: 2, // rem - from bottom edge to screen end.

  srhDelay: 500, // ms
  srhDispDelay: 300, // ms - added just for observation - how it seems.

  recentCountPerRow: 10,

  // scrolling
  scrollIntoViewOffset: 9 * getREM(),
  scrollSpeed: 50, // rem per sec.
  scrollStep: 2, // rem

  scrollStartReg: { up: 0.1, dn: 0.93 },

  updateColumnCountAndREM() {
    this.rem = getREM();
    this.scrollIntoViewOffset = 9 * this.rem;
    // if(isNaN(this.rem)) return; // NaN check in getREM();

    let rowWidthPx = this.rem * this.rowWidth;
    this.noOfCols = Math.floor(
      (window.innerWidth - this.rem * this.sideContentWidth) / rowWidthPx
    );
  }
};
GLOBAL_SETTINGS.updateColumnCountAndREM();

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
  WAS_SEL: 'was-selected', // Simply for visual aid.
  SHW_IN_FOL: 'show-in-folder' // Simply for visual aid.
};

const ACCORDION_CLASSES = {
  folCol: 'folder-view-column'
};

const FOLDER_CLASSES = {
  EXP: 'expanded',
  COL: 'collapsed',
  FOL: 'folder',
  NO_EXP: 'do-not-expand',
  PIN_TITLE: 'pin-title',
  FUL_TITLE: 'folder-view-title'
};
const BKM_CLASSES = {
  BKM: 'bookmark'
};
const BEING_DRAGGED_CLASS = 'being-dragged';
const BEING_DRAGGED_OVER = 'being-dragged-over';

const NODE_PROP = {
  // NOT USED ACTUALLY.
  urlLower: 'urlLower',
  titleLower: 'titleLower',
  parentChain: 'parentChain'
};

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

const MOVE_WITHIN_SELF = 'Trying to move a folder within itself.';

// ASSUMPTION: Two nodes with this name will never occur.
const FOL_RENAME_STR = '__rnm__temp__';
const DEFAULT_ROOT_ID = '__MY__ROOT__BKM__TREE__ID__';
const MODE = {
  production: true,
  development: false
};
const TIMESTAMP = {
  // Used for closing duplicate instances of bkm manager.
  key: '__timestamp__started__',
  _val: '',

  get val() {
    if (!this._val) {
      this._val = (new Date().getTime() + Math.random()).toString();
    }
    return this._val;
  }
};

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
  NODE_PROP,
  BEING_DRAGGED_CLASS,
  BEING_DRAGGED_OVER,
  CUSTOM_EVENTS,
  OVERLAY_CLASSES,
  OVERLAY_STATES,
  ACCORDION_CLASSES,
  MOVE_WITHIN_SELF,
  FOL_RENAME_STR,
  DEFAULT_ROOT_ID,
  MODE,
  TIMESTAMP
};
