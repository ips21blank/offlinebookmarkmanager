import {
  ChangeFlowDirectionAction,
  Settings,
  SettingsActions,
  ACTIONS,
  PinFolder,
  RmvPin,
  MovPin
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
    case ACTIONS.MOV_PIN: {
      let payload = (<MovPin>action).payload,
        index =
          payload.newIndex || payload.newIndex === 0
            ? payload.newIndex
            : state.pins.length - 1,
        currI = state.pins.indexOf(payload.pinId);

      if (currI === -1) return state;
      if (index > currI) index--;

      state.pins.splice(currI, 1);
      state.pins.splice(index, 0, payload.pinId);
      return { ...state, pins: [...state.pins] };
    }
    default:
      return state;
  }
};
