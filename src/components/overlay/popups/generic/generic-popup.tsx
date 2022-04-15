import { GenericPopupProps } from '@proj-types/types';
import {
  PopupTitle,
  PopupText,
  PopupForm,
  PopupButtons
} from './popup-components';

/**
 * Following component does not use popup type prop.
 * Type is instead used by a parent component for configuring this component.
 * Also, toggleOverlay should already be present in one or more actions.
 * Form and its state should also be configured.
 */
const GenericPopup: React.FC<GenericPopupProps> = ({
  className,
  title,
  alignTitle,

  text,

  form,

  actions, // Should be buttons directly at this point.
  alignButtons,

  children
}) => {
  return (
    <div id="popup" className={className || ''}>
      <PopupTitle {...{ title, alignTitle }} />
      <div id="popup-content">
        <PopupText text={text} />
        <PopupForm {...form} />
        {children}
      </div>
      <PopupButtons {...{ actions, alignButtons }} />
    </div>
  );
};

export { GenericPopup };
