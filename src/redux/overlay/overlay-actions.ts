import {
  ACTIONS,
  CtxMenuData,
  CtxMenuType,
  PopupData,
  PopupType,
  ShowCtxMenu,
  ShowPopup,
  ToggleOverlay
} from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';

const toggleOverlay = (): ToggleOverlay => ({
  type: ACTIONS.TOGGLE_OVERLAY,
  payload: {}
});

// prettier-ignore
const showCtxMenu = (
  type: CtxMenuType,
  payload: CtxMenuData
): ShowCtxMenu => ({ type, payload });

// prettier-ignore
const showPopup = (
  type: PopupType,
  payload: PopupData
): ShowPopup => ({ type, payload });

export { toggleOverlay, showCtxMenu, showPopup };
