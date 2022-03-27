import { ACTIONS } from './action-types';

export interface Settings {
  flowDirection: FLOW_DIRECTION;
  pins: string[];
  homePin?: string;
  showFolBkmIcons: boolean;
}

export enum FLOW_DIRECTION {
  ROW,
  COLUMN
}

export enum DISP_MODES {
  EDIT,
  VIEW
}

// ACTIONS

export interface SettingsActions {
  type: ACTIONS;
  payload: any;
}

export interface ChangeFlowDirectionAction extends SettingsActions {
  type: ACTIONS.CHANGE_FLOW_DIRECTION;
  payload: { newDirection: FLOW_DIRECTION };
}
