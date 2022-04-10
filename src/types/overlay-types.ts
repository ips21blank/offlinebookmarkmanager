import { OVERLAY_CLASSES, OVERLAY_STATES } from '@scripts/globals';
import { ACTIONS } from './action-types';
import { DataNode } from './browser-types';

// Context Menu.
interface NodeCtxMenu {
  node: DataNode;
  rename: () => void;
  x: number;
  y: number;
}

interface FolCtxMenu extends NodeCtxMenu {
  isCollapsed: boolean;
  expandCollapse: () => void;
}

interface BkmCtxMenu extends NodeCtxMenu {}

type CtxMenuType = ACTIONS.BKM_CONTEXT_MENU | ACTIONS.FOL_CONTEXT_MENU;
type CtxMenuData = FolCtxMenu | BkmCtxMenu;

// Popups.
interface CommonPopupData {
  title: string;
}
interface InfoWarnPopup extends CommonPopupData {
  text: string;
}
interface ConfirmPopup extends CommonPopupData {
  text: string;
  action: () => any;
}
interface editNodePopup extends CommonPopupData {
  node: DataNode;
}

type PopupType =
  | ACTIONS.WARNING
  | ACTIONS.INFO
  | ACTIONS.CONFIRM
  | ACTIONS.EDIT_NODE;
type PopupData = InfoWarnPopup | ConfirmPopup | editNodePopup;

interface OverlayAction {
  type: ACTIONS;
  payload: any;
}

interface ToggleOverlay extends OverlayAction {
  type: ACTIONS.TOGGLE_OVERLAY;
  payload: any;
}

interface ShowCtxMenu extends OverlayAction {
  type: CtxMenuType;
  payload: CtxMenuData;
}

interface ShowPopup extends OverlayAction {
  type: PopupType;
  payload: PopupData;
}

interface OverlayState {
  visible: boolean;
  type: OVERLAY_CLASSES.transparent | OVERLAY_CLASSES.normal;

  overlayState: OVERLAY_STATES;

  ctxMenuType?: CtxMenuType;
  ctxMenuData?: CtxMenuData;

  popupType?: PopupType;
  popupData?: PopupData;
}

export type {
  OverlayState,
  OverlayAction,
  ToggleOverlay,
  ShowCtxMenu,
  ShowPopup,
  //
  FolCtxMenu,
  BkmCtxMenu,
  CtxMenuType,
  CtxMenuData,
  //
  PopupType,
  PopupData,
  InfoWarnPopup,
  ConfirmPopup,
  editNodePopup
};
