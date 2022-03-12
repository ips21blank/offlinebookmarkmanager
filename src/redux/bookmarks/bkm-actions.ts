import {
  ACTIONS,
  NodeRemoveAction,
  NodeMoveAction,
  NodeChangeAction,
  NodesReorderedAction,
  NodeCreateAction,
  DataNode
} from '@proj-types/types';

const rmvNode = (id: string): NodeRemoveAction => {
  return { payload: { id }, type: ACTIONS.REMOVE };
};

const movNode = (
  id: string,
  newParentId: string,
  index?: number
): NodeMoveAction => {
  return {
    type: ACTIONS.MOVE,
    payload: { id, newParentId, index }
  };
};

const changeNode = (
  id: string,
  url: string,
  title: string
): NodeChangeAction => {
  return {
    type: ACTIONS.CHANGE,
    payload: { id, url, title }
  };
};

const reorderNode = (id: string, childIds: string[]): NodesReorderedAction => {
  return {
    type: ACTIONS.REORDER,
    payload: { id, childIds }
  };
};

const createNode = (id: string, node: DataNode): NodeCreateAction => {
  return {
    type: ACTIONS.CREATE,
    payload: { id, node }
  };
};

export { rmvNode, movNode, changeNode, reorderNode, createNode };
