import {
  ACTIONS,
  FLOW_DIRECTION,
  ChangeFlowDirectionAction,
  PinFolder,
  DataNode,
  RmvPin,
  MovPin,
  SetPinAsHome
} from '@proj-types/types';

const changeFlowDirection = (
  newDirection: FLOW_DIRECTION = FLOW_DIRECTION.COLUMN
): ChangeFlowDirectionAction => {
  return {
    type: ACTIONS.CHANGE_FLOW_DIRECTION,
    payload: { newDirection }
  };
};

const pinFolder = (node: DataNode, index?: number): PinFolder => {
  let pinId: string = node.url ? '' : node.id;
  return { type: ACTIONS.ADD_PIN, payload: { pinId, index } };
};

const setPinAsHome = (nodeId: string): SetPinAsHome => {
  return { type: ACTIONS.HOM_PIN, payload: { nodeId } };
};

const rmvPin = (pinId: string): RmvPin => ({
  type: ACTIONS.RMV_PIN,
  payload: { pinId }
});

const movPin = (pinId: string, newIndex?: number): MovPin => ({
  type: ACTIONS.MOV_PIN,
  payload: { pinId, newIndex }
});

export { changeFlowDirection, pinFolder, rmvPin, movPin, setPinAsHome };
