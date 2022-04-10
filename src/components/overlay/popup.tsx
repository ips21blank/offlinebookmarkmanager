import { useAppSelector } from '@redux/redux';
import { InfoWarn } from './popups/info-warn';
import { Confirm } from './popups/confirm';
import { ConfirmPopup, editNodePopup, ACTIONS } from '@proj-types/types';
import { EditNodePopup } from './popups/edit-node';

const Popup: React.FC<{ toggleOverlay: Function }> = ({ toggleOverlay }) => {
  let [type, popupData] = useAppSelector((state) => [
    state.overlay.popupType,
    state.overlay.popupData
  ]);
  if (!type || !popupData) return <></>;

  switch (type) {
    case ACTIONS.INFO:
    case ACTIONS.WARNING: {
      let props = { ...popupData, toggleOverlay, type, buttonText: 'Ok' };
      return <InfoWarn {...props} />;
    }
    case ACTIONS.CONFIRM: {
      let data = popupData as ConfirmPopup;
      let props = { ...data, confirmAction: data.action, toggleOverlay, type };
      return <Confirm {...props} />;
    }
    case ACTIONS.EDIT_NODE: {
      let data = popupData as editNodePopup;
      let props = { ...data, toggleOverlay, type };
      return <EditNodePopup {...props} />;
    }
    default:
      return <></>;
  }
};

export { Popup };
