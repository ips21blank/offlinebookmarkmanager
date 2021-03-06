import {
  ChangeFlowDirectionAction,
  Settings,
  SettingsActions,
  ACTIONS,
  PinFolder,
  RmvPin,
  MovPin,
  SetPinAsHome
} from '@proj-types/types';
import { initialStateSettings } from '@redux/initial-states';
import { browserAPI } from '@scripts/scripts';

const updatePins = (pins: string[]) => browserAPI.store({ pins });

export const getSettingsReducer = () => {
  return (state = initialStateSettings, action: SettingsActions): Settings => {
    switch (action.type) {
      case ACTIONS.CHANGE_FLOW_DIRECTION: {
        let payload = (<ChangeFlowDirectionAction>action).payload;
        browserAPI.store({ flowDirection: payload.newDirection });

        return { ...state, flowDirection: payload.newDirection };
      }
      case ACTIONS.ADD_PIN: {
        let payload = (<PinFolder>action).payload;
        let index =
          payload.index &&
          payload.index >= 0 &&
          payload.index <= state.pins.length
            ? payload.index
            : 0;

        let currI = state.pins.indexOf(payload.pinId);
        if (currI !== -1) {
          state.pins.splice(currI, 1); // could handle move as well.
          if (index > currI) index--;
        }

        payload.pinId && state.pins.splice(index, 0, payload.pinId);
        updatePins(state.pins);
        return (payload.pinId && { ...state, pins: [...state.pins] }) || state;
      }
      case ACTIONS.HOM_PIN: {
        let payload = (<SetPinAsHome>action).payload;
        browserAPI.store({ homePin: payload.nodeId });
        return payload.nodeId ? { ...state, homePin: payload.nodeId } : state;
      }
      case ACTIONS.RMV_PIN: {
        let payload = (<RmvPin>action).payload;
        let index = state.pins.indexOf(payload.pinId);
        if (index !== -1) {
          state.pins.splice(index, 1);
          updatePins(state.pins);
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
        index = index > state.pins.length ? state.pins.length : index;

        if (currI === -1) return state;
        if (index > currI) index--;

        state.pins.splice(currI, 1);
        state.pins.splice(index, 0, payload.pinId);
        updatePins(state.pins);
        return { ...state, pins: [...state.pins] };
      }
      default:
        return state;
    }
  };
};
