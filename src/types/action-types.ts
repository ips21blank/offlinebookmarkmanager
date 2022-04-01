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

  // Overlay actions
  TOGGLE_OVERLAY,

  // Settings actions.
  CHANGE_FLOW_DIRECTION
}
