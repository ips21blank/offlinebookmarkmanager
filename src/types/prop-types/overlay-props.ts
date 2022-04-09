import { ACTIONS } from '@proj-types/action-types';
import { DataNode } from '@proj-types/browser-types';

interface OverlayProps {}

interface OverlayContentProps {
  toggleOverlay: () => any;
}

type PopupTypes = ACTIONS.CONFIRM | ACTIONS.WARNING | ACTIONS.INFO;
type PopupAlighment = 'left' | 'center' | 'right';

interface PopupAction {
  type: ACTIONS;
  payload: any;
}

// Popup form.
interface PopupInputField {
  id: string;
  type: 'text' | 'checkbox' | 'range';
  label: string;
  disabled?: boolean;

  value: string;
  setValue: Function;
}
interface PopupFormProps {
  title?: string;
  text?: string;
  fields: PopupInputField[];
}

interface PopupButtonProps {
  title: string;
  action: Function;
}

/**
 * Following component does not use popup type prop.
 * Type is instead used by a parent component for configuring this component.
 * Also, toggleOverlay should already be present in one or more actions.
 * Form and its state should also be configured.
 */
interface GenericPopupProps {
  className?: string;
  title: string;
  alignTitle?: PopupAlighment;

  text?: string;

  form?: PopupFormProps;

  actions?: PopupButtonProps[];
  alignButtons?: PopupAlighment;
}

interface PopupProps extends GenericPopupProps {
  type: PopupTypes;
  toggleOverlay: Function;
}

interface InfoWarnProps extends PopupProps {
  buttonText: string;
}

interface ConfirmProps extends PopupProps {
  confirmAction: Function;

  okTitle?: string;
  cancelTitle: string;
}

interface EditNodeProps extends PopupProps {
  node: DataNode;
}

export type {
  PopupTypes,
  PopupAlighment,
  PopupButtonProps,
  PopupFormProps,
  PopupAction,
  //
  OverlayProps,
  OverlayContentProps,
  //
  GenericPopupProps,
  PopupProps,
  //
  InfoWarnProps,
  ConfirmProps,
  EditNodeProps
};
