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

  // OVERLAY
  TOGGLE_OVERLAY,
  // ctx-menu
  FOL_CONTEXT_MENU,
  BKM_CONTEXT_MENU,
  // Popups
  CONFIRM,
  WARNING,
  INFO,

  // Settings actions.
  CHANGE_FLOW_DIRECTION,
  ADD_PIN,
  RMV_PIN
}
