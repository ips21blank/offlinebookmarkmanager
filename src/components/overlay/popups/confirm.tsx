import { ConfirmProps } from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';
import { GenericPopup } from './generic/generic-popup';

const Confirm: React.FC<ConfirmProps> = (props) => {
  let className = OVERLAY_CLASSES.confirm,
    actions = [
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
    ],
    confirmProps = { ...props, className, actions };

  return <GenericPopup {...confirmProps} />;
};

export { Confirm };
