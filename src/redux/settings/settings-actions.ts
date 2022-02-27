import {
  SETTINGS_ACTIONS_TYPES,
  FLOW_DIRECTION,
  ChangeFlowDirectionAction
} from '@proj-types/types';

const changeFlowDirection = (
  newDirection: FLOW_DIRECTION
): ChangeFlowDirectionAction => {
  return {
    type: SETTINGS_ACTIONS_TYPES.CHANGE_FLOW_DIRECTION,
    payload: { newDirection }
  };
};

export { changeFlowDirection };
