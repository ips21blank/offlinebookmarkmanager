export interface Settings {
  flowDirection: FLOW_DIRECTION;
}

export enum FLOW_DIRECTION {
  ROW,
  COLUMN
}

export enum SETTINGS_ACTIONS_TYPES {
  CHANGE_FLOW_DIRECTION
}

// ACTIONS

export interface SettingsActions {
  type: SETTINGS_ACTIONS_TYPES;
  payload: any;
}

export interface ChangeFlowDirectionAction extends SettingsActions {
  type: SETTINGS_ACTIONS_TYPES.CHANGE_FLOW_DIRECTION;
  payload: { newDirection: FLOW_DIRECTION };
}
