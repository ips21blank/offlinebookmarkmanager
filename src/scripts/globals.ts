import { FLOW_DIRECTION } from '@proj-types/settings-types';

const GLOBAL_SETTINGS = {
  // CHANGES TO FOLLOWING WOULD REQUIRE RELOADS.
  showIcons: true,
  dragMarginsPercentMin: 0.25,
  dragMarginsPercentMax: 0.75,
  minRowsPerCol: 5, // for row direction display.
  dragSwitchThreshold: 100,
  dragOverThreshold: 50
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

export {
  GLOBAL_SETTINGS,
  DRAGTYPE,
  DROPTYPE,
  DRAG_REG,
  REG_CLASSES,
  getRegClass
};
