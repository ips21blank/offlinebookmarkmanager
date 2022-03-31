import { FLOW_DIRECTION, SelectionState } from '@proj-types/types';
import { Selection } from './selection';

const getREM: () => number = () => {
  let fs = getComputedStyle(document.documentElement).fontSize;
  return parseInt((fs.match(/\d+/g) as string[])[0]) || 14;
};

const GLOBAL_SETTINGS = {
  // CHANGES TO FOLLOWING WOULD REQUIRE RELOADS.
  showIcons: true,
  dragMarginsPercentMin: 0.25,
  dragMarginsPercentMax: 0.75,
  minRowsPerCol: 5, // for row direction display.
  dragLeaveThreshold: 50,
  dragOverThreshold: 20,

  dragStartThreshold: 0.3 * getREM(), // px
  rem: getREM()
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
  AFT
}

const REG_CLASSES: { [key: string]: string } = {
  ROW_BEF: 'row-bef',
  ROW_BET: 'row-bet',
  ROW_AFT: 'row-aft',
  COL_BEF: 'col-bef',
  COL_BET: 'col-bet',
  COL_AFT: 'col-aft'
};

const getRegClass = (reg: DRAG_REG, direction: FLOW_DIRECTION) => {
  let className: string;
  direction === FLOW_DIRECTION.COLUMN
    ? (className = 'col-')
    : (className = 'row-');

  switch (reg) {
    case DRAG_REG.BEF:
      className += 'bef';
      break;
    case DRAG_REG.BET:
      className += 'bet';
      break;
    case DRAG_REG.AFT:
    default:
      className += 'aft';
  }

  return className;
};

const SELECTION: SelectionState = new Selection();
const SELECT_CLASS = 'selected';

const folderStateClasses = {
  EXP: 'expanded',
  COL: 'collapsed',
  NO_EXP: 'do-not-expand'
};

export {
  GLOBAL_SETTINGS,
  DRAGTYPE,
  DROPTYPE,
  DRAG_REG,
  REG_CLASSES,
  SELECTION,
  SELECT_CLASS,
  getRegClass,
  folderStateClasses
};
