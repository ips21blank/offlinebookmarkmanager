import { OVERLAY_CLASSES } from '@scripts/globals';
import { ACTIONS } from './action-types';
import { DataNode } from './browser-types';

interface FolCtxMenu {
  node: DataNode;
  rename: () => void;
  expand: () => void;
}

interface BkmCtxMenu {
  node: DataNode;
  rename: () => void;
}

type CtxMenuData = FolCtxMenu | BkmCtxMenu;
type CtxMenuType = ACTIONS.BKM_CONTEXT_MENU | ACTIONS.FOL_CONTEXT_MENU;

interface OverlayAction {
  type: ACTIONS;
  payload: any;
}

interface ToggleOverlay extends OverlayAction {
  type: ACTIONS.TOGGLE_OVERLAY;
  payload: { type: OVERLAY_CLASSES; showCtxMenu?: boolean };
}

interface ShowCtxMenu extends OverlayAction {
  type: CtxMenuType;
  payload: {
    ctxMenuData: CtxMenuData;
  };
}

interface OverlayState {
  visible: boolean;
  type: OVERLAY_CLASSES;

  ctxMenuType?: CtxMenuType;
  ctxMenuData?: CtxMenuData;
}

export type {
  OverlayState,
  OverlayAction,
  ToggleOverlay,
  ShowCtxMenu,
  FolCtxMenu,
  BkmCtxMenu,
  CtxMenuType,
  CtxMenuData
};
