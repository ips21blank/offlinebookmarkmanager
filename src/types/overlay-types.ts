import { ACTIONS } from './action-types';

interface OverlayAction {
  type: ACTIONS;
  payload: any;
}

interface ToggleOverlay {
  type: ACTIONS.TOGGLE_OVERLAY;
  payload: null;
}

interface OverlayState {
  visible: boolean;
}

export type { OverlayState, OverlayAction, ToggleOverlay };
