import { ConfirmProps } from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';
import { Popup } from './generic/popup';

const Confirm: React.FC<ConfirmProps> = (props) => {
  props.className = OVERLAY_CLASSES.confirm;
  props.actions = [
    {
      title: props.okTitle || 'OK',
      action: () => {
        props.confirmAction();
        props.toggleOverlay();
      }
    },
    {
      title: props.cancelTitle || 'Cancel',
      action: () => {
        props.toggleOverlay();
      }
    }
  ];

  return <Popup {...props} />;
};

export { Confirm };
