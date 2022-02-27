import {
  ChangeFlowDirectionAction,
  FLOW_DIRECTION,
  Settings,
  SettingsActions,
  SETTINGS_ACTIONS_TYPES
} from '@proj-types/types';

const initialState: Settings = {
  flowDirection: FLOW_DIRECTION.COLUMN
};

export const settingsReducer = (
  state = initialState,
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
