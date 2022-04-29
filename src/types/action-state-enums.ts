export enum ACTIONS {
  // Browser Actions.
  REMOVE,
  MOVE,
  CHANGE,
  REORDER,
  CREATE,

  // Actions related to the display state.
  SET_CURR_LOCATION,
  UPDATE_COL_COUNT,
  SELECT_DESELECT_NODE,
  START_DRAG,
  END_DRAG,
  ELEMENTS_MOVED,
  TOGGLE_DISP_MODE,
  TOGGLE_GROUPING,

  // OVERLAY
  TOGGLE_OVERLAY,
  // ctx-menu
  FOL_CONTEXT_MENU,
  BKM_CONTEXT_MENU,
  // Popups
  CONFIRM,
  WARNING,
  INFO,
  EDIT_NODE,
  MOVE_POPUP,
  COPY_TO_POPUP,

  // Settings actions.
  CHANGE_FLOW_DIRECTION,
  ADD_PIN,
  RMV_PIN,
  MOV_PIN
}

export enum DISP_MODES {
  EDIT,
  VIEW
}

export enum FLOW_DIRECTION {
  ROW,
  COLUMN
}
