import { ACTIONS } from '@proj-types/action-types';
import { OverlayAction, OverlayState } from '@proj-types/overlay-types';
import { initialOverlayState } from '@redux/initial-states';

const overlayReducer = (state = initialOverlayState, action: OverlayAction) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_OVERLAY: {
      return { ...state, visible: !state.visible };
    }
    default:
      return state;
  }
};

export { overlayReducer };
