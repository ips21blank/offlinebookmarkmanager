import {
  ACTIONS,
  CtxMenuData,
  CtxMenuType,
  ShowCtxMenu,
  ToggleOverlay
} from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';

const toggleOverlay = (type = OVERLAY_CLASSES.normal): ToggleOverlay => ({
  type: ACTIONS.TOGGLE_OVERLAY,
  payload: { type }
});

const showCtxMenu = (
  ctxMenuType: CtxMenuType,
  ctxMenuData: CtxMenuData
): ShowCtxMenu => ({ type: ctxMenuType, payload: { ctxMenuData } });

export { toggleOverlay, showCtxMenu };
