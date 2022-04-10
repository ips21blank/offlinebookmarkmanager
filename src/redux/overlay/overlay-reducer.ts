import { ACTIONS } from '@proj-types/action-types';
import {
  OverlayAction,
  OverlayState,
  ShowCtxMenu,
  ShowPopup,
  ToggleOverlay
} from '@proj-types/types';
import { initialOverlayState } from '@redux/initial-states';
import { OVERLAY_CLASSES, OVERLAY_STATES } from '@scripts/globals';

const overlayReducer = (
  state = initialOverlayState,
  action: OverlayAction
): OverlayState => {
  switch (action.type) {
    case ACTIONS.TOGGLE_OVERLAY: {
      let payload = (<ToggleOverlay>action).payload;

      let type =
          payload.type !== OVERLAY_CLASSES.normal &&
          payload.type !== OVERLAY_CLASSES.transparent
            ? OVERLAY_CLASSES.normal
            : payload.type,
        visible = !state.visible,
        overlayState = OVERLAY_STATES.blank;

      return { ...state, type, visible, overlayState };
    }
    case ACTIONS.FOL_CONTEXT_MENU:
    case ACTIONS.BKM_CONTEXT_MENU: {
      let ctxMenuData = (<ShowCtxMenu>action).payload;
      return {
        ...state,
        ctxMenuData,
        overlayState: OVERLAY_STATES.ctxMenu,

        ctxMenuType: action.type,
        type: OVERLAY_CLASSES.transparent,
        visible: true
      };
    }
    case ACTIONS.INFO:
    case ACTIONS.WARNING:
    case ACTIONS.CONFIRM:
    case ACTIONS.EDIT_NODE: {
      let popupData = (<ShowPopup>action).payload;
      return {
        ...state,
        popupData,
        overlayState: OVERLAY_STATES.popup,

        popupType: action.type,
        type: OVERLAY_CLASSES.normal,
        visible: true
      };
    }
    default:
      return state;
  }
};

export { overlayReducer };
