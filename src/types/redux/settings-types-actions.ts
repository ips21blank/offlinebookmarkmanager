import { ACTIONS } from './action-types';
import { DISP_MODES, FLOW_DIRECTION } from '../state-types';

interface Settings {
  flowDirection: FLOW_DIRECTION;
  pins: string[];
  homePin?: string;
  showFolBkmIcons: boolean;
}

// ACTIONS

interface SettingsActions {
  type: ACTIONS;
  payload: any;
}

interface ChangeFlowDirectionAction extends SettingsActions {
  type: ACTIONS.CHANGE_FLOW_DIRECTION;
  payload: { newDirection: FLOW_DIRECTION };
}

interface PinFolder extends SettingsActions {
  type: ACTIONS.ADD_PIN;
  payload: { pinId: string; index?: number };
}

interface RmvPin extends SettingsActions {
  type: ACTIONS.RMV_PIN;
  payload: { pinId: string };
}

interface MovPin extends SettingsActions {
  type: ACTIONS.MOV_PIN;
  payload: { pinId: string; newIndex?: number };
}

export type {
  Settings,
  SettingsActions,
  ChangeFlowDirectionAction,
  PinFolder,
  RmvPin,
  MovPin
};

export { FLOW_DIRECTION, DISP_MODES };
