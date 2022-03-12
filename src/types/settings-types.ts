import { ACTIONS } from './action-types';

export interface Settings {
  flowDirection: FLOW_DIRECTION;
  pins: string[];
  homePin?: string;
  showFolBkmIcons: boolean;
  minRowsPerCol: number;
}

export enum FLOW_DIRECTION {
  ROW,
  COLUMN
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
