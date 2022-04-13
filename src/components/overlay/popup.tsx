import { highlightElementsMoved, useAppSelector } from '@redux/redux';
import { InfoWarn } from './popups/info-warn';
import { Confirm } from './popups/confirm';
import {
  ConfirmPopupData,
  EditNodePopupData,
  ACTIONS,
  InfoPopupData,
  WarnPopupData,
  MovePopupData,
  CopyToPopupData
} from '@proj-types/types';
import { EditNodePopup } from './popups/edit-node';
import { CopyMovePopup } from './popups/copy-move-popup';

const Popup: React.FC<{ toggleOverlay: Function }> = ({ toggleOverlay }) => {
  let [type, popupData] = useAppSelector((state) => [
    state.overlay.popupType,
    state.overlay.popupData
  ]);
  if (!type || !popupData) return <></>;

  switch (type) {
    case ACTIONS.INFO: {
      let data = popupData as InfoPopupData;
      let props = { ...data, toggleOverlay, type, buttonText: 'Ok' };
      return <InfoWarn {...props} />;
    }
    case ACTIONS.WARNING: {
      let data = popupData as WarnPopupData;
      let props = { ...data, toggleOverlay, type, buttonText: 'Ok' };
      return <InfoWarn {...props} />;
    }
    case ACTIONS.CONFIRM: {
      let data = popupData as ConfirmPopupData;
      let props = { ...data, confirmAction: data.action, toggleOverlay, type };
      return <Confirm {...props} />;
    }
    case ACTIONS.EDIT_NODE: {
      let data = popupData as EditNodePopupData;
      let props = { ...data, toggleOverlay, type };
      return <EditNodePopup {...props} />;
    }
    case ACTIONS.MOVE_POPUP:
    case ACTIONS.COPY_TO_POPUP: {
      let data = popupData as MovePopupData | CopyToPopupData;
      let copyOrMove: 'copy' | 'move' =
        type === ACTIONS.MOVE_POPUP ? 'move' : 'copy';
      let props = {
        ...data,
        copyOrMove,
        toggleOverlay,
        type
      };
      return <CopyMovePopup {...props} />;
    }
    default:
      return <></>;
  }
};

export { Popup };
