import { ACTIONS, InfoWarnProps } from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';
import React from 'react';
import { GenericPopup } from './generic/generic-popup';

const InfoWarn: React.FC<InfoWarnProps> = (props) => {
  let actions = [{ title: props.buttonText, action: props.toggleOverlay }],
    className =
      props.type === ACTIONS.INFO ? OVERLAY_CLASSES.info : OVERLAY_CLASSES.warn,
    infoWarnProps = { ...props, actions, className };

  return <GenericPopup {...infoWarnProps} />;
};

export { InfoWarn };
