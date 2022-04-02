import { ACTIONS } from '@proj-types/action-types';
import {
  OverlayAction,
  OverlayState,
  ShowCtxMenu,
  ToggleOverlay
} from '@proj-types/types';
import { initialOverlayState } from '@redux/initial-states';

const overlayReducer = (
  state = initialOverlayState,
  action: OverlayAction
): OverlayState => {
  switch (action.type) {
    case ACTIONS.TOGGLE_OVERLAY: {
      let payload = (<ToggleOverlay>action).payload;
      return { ...state, visible: !state.visible, type: payload.type };
    }
    case ACTIONS.FOL_CONTEXT_MENU:
    case ACTIONS.BKM_CONTEXT_MENU: {
      let payload = (<ShowCtxMenu>action).payload;
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};

export { overlayReducer };
