import {
  ChangeFlowDirectionAction,
  Settings,
  SettingsActions,
  SETTINGS_ACTIONS_TYPES
} from '@proj-types/types';
import { initialStateSettings } from '@redux/initial-states';

export const settingsReducer = (
  state = initialStateSettings,
  action: SettingsActions
): Settings => {
  switch (action.type) {
    case SETTINGS_ACTIONS_TYPES.CHANGE_FLOW_DIRECTION: {
      let payload = (<ChangeFlowDirectionAction>action).payload;
      return { ...state, flowDirection: payload.newDirection };
    }
    default:
      return state;
  }
};
