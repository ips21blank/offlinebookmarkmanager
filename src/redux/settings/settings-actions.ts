import {
  ACTIONS,
  FLOW_DIRECTION,
  ChangeFlowDirectionAction
} from '@proj-types/types';

const changeFlowDirection = (
  newDirection: FLOW_DIRECTION
): ChangeFlowDirectionAction => {
  return {
    type: ACTIONS.CHANGE_FLOW_DIRECTION,
    payload: { newDirection }
  };
};

export { changeFlowDirection };
