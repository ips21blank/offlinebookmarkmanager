import {
  ChangeFlowDirectionAction,
  Settings,
  SettingsActions,
  ACTIONS,
  PinFolder,
  RmvPin
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
    case ACTIONS.ADD_PIN: {
      let payload = (<PinFolder>action).payload;
      let index =
        payload.index >= 0 && payload.index < state.pins.length
          ? payload.index
          : state.pins.length;

      let currI = state.pins.indexOf(payload.pinId);
      if (currI !== -1) {
        state.pins.splice(currI, 1);
        if (index > currI) index--;
      }

      payload.pinId && state.pins.splice(index, 0, payload.pinId);
      return (payload.pinId && { ...state, pins: [...state.pins] }) || state;
    }
    case ACTIONS.RMV_PIN: {
      let payload = (<RmvPin>action).payload;
      let index = state.pins.indexOf(payload.pinId);
      if (index !== -1) {
        state.pins.splice(index, 1);
        return { ...state, pins: [...state.pins] };
      }

      return state;
    }
    default:
      return state;
  }
};
