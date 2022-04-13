import {
  ACTIONS,
  CtxMenuData,
  CtxMenuType,
  InfoPopupData,
  WarnPopupData,
  PopupData,
  PopupType,
  ShowCtxMenu,
  ShowPopup,
  ToggleOverlay,
  EditNodePopupData,
  ConfirmPopupData,
  MovePopupData,
  CopyToPopupData
} from '@proj-types/types';

const toggleOverlay = (): ToggleOverlay => ({
  type: ACTIONS.TOGGLE_OVERLAY,
  payload: {}
});

const showCtxMenu = (payload: CtxMenuData): ShowCtxMenu => {
  let type: CtxMenuType;
  if (payload.node.url) {
    type = ACTIONS.BKM_CONTEXT_MENU;
  } else {
    type = ACTIONS.FOL_CONTEXT_MENU;
  }
  return { type, payload };
};

// prettier-ignore

// WARNING: Following was just created for testing - to avoid too many imports.
const showPopup = (
  type: PopupType,
  payload: PopupData
): ShowPopup => ({ type, payload });

const showInfoPopup = (payload: InfoPopupData): ShowPopup => ({
  type: ACTIONS.INFO,
  payload
});

const showWarnPopup = (payload: WarnPopupData): ShowPopup => ({
  type: ACTIONS.WARNING,
  payload
});

const showConfirmPopup = (payload: ConfirmPopupData): ShowPopup => ({
  type: ACTIONS.CONFIRM,
  payload
});

const showEditNodePopup = (payload: EditNodePopupData): ShowPopup => ({
  type: ACTIONS.EDIT_NODE,
  payload
});

const showMovePopup = (payload: MovePopupData): ShowPopup => ({
  type: ACTIONS.MOVE_POPUP,
  payload
});

const showCopyToPopup = (payload: CopyToPopupData): ShowPopup => ({
  type: ACTIONS.COPY_TO_POPUP,
  payload
});

export {
  toggleOverlay,
  showCtxMenu,
  showPopup,
  showInfoPopup,
  showWarnPopup,
  showConfirmPopup,
  showEditNodePopup,
  showMovePopup,
  showCopyToPopup
};
