import { ACTIONS, InfoWarnProps } from '@proj-types/types';
import { OVERLAY_CLASSES } from '@scripts/globals';
import React from 'react';
import { Popup } from './generic/popup';

const InfoWarn: React.FC<InfoWarnProps> = (props) => {
  props.actions = [{ title: props.buttonText, action: props.toggleOverlay }];
  props.className =
    props.type === ACTIONS.INFO ? OVERLAY_CLASSES.info : OVERLAY_CLASSES.warn;

  return <Popup {...props} />;
};

export { InfoWarn };
