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

// POPUPS.

// Data used by popups.
interface CommonPopupData {
  title: string;
}
interface InfoPopupData extends CommonPopupData {
  text: string;
}
interface WarnPopupData extends CommonPopupData {
  text: string;
}
interface ConfirmPopupData extends CommonPopupData {
  text: string;
  action: () => any;
}
interface EditNodePopupData extends CommonPopupData {
  node: DataNode;
}
interface CopyMovePopupData extends CommonPopupData {
  idList: string[];
}
interface MovePopupData extends CopyMovePopupData {}
interface CopyToPopupData extends CopyMovePopupData {}

type PopupType =
  | ACTIONS.WARNING
  | ACTIONS.INFO
  | ACTIONS.CONFIRM
  | ACTIONS.EDIT_NODE
  | ACTIONS.MOVE_POPUP
  | ACTIONS.COPY_TO_POPUP;
type PopupData =
  | InfoPopupData
  | WarnPopupData
  | ConfirmPopupData
  | EditNodePopupData
  | MovePopupData
  | CopyToPopupData;

// ACTION data.
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
// Action for all popups is similar - it only differs in payload.
interface ShowPopup extends OverlayAction {
  type: PopupType;
  payload: PopupData;
}

// State of overlay object in redux.
interface OverlayState {
  visible: boolean;
  type: OVERLAY_CLASSES.transparent | OVERLAY_CLASSES.normal;

  overlayState: OVERLAY_STATES;

  ctxMenuType?: CtxMenuType;
  ctxMenuData?: CtxMenuData;

  popupType?: PopupType;
  popupData?: PopupData;
  fullHeight?: boolean;
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
  InfoPopupData,
  WarnPopupData,
  ConfirmPopupData,
  EditNodePopupData,
  MovePopupData,
  CopyToPopupData
};
