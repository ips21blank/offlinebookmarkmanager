import {
  ChangeFlowDirectionAction,
  Settings,
  SettingsActions,
  ACTIONS
} from '@proj-types/types';
import { initialStateSettings } from '@redux/initial-states';

export const settingsReducer = (
  state = initialStateSettings,
  action: SettingsActions
): Settings => {
  switch (action.type) {
    case ACTIONS.CHANGE_FLOW_DIRECTION: {
      let payload = (<ChangeFlowDirectionAction>action).payload;
      return { ...state, flowDirection: payload.newDirection };
    }
    default:
      return state;
  }
};
