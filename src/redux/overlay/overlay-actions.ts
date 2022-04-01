import { ACTIONS, ToggleOverlay } from '@proj-types/types';

const toggleOverlay: () => ToggleOverlay = () => ({
  type: ACTIONS.TOGGLE_OVERLAY,
  payload: null
});

export { toggleOverlay };
