import {
  ACTIONS,
  NodeRemoveAction,
  NodeMoveAction,
  NodeChangeAction,
  NodesReorderedAction,
  NodeCreateAction,
  DataNode,
  SearchNodes,
  RefreshSearch,
  DuplicatesSearch,
  UpdateDuplicateNodeParentChains
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
  changeInfo: {
    url?: string;
    title?: string;
  }
): NodeChangeAction => {
  return {
    type: ACTIONS.CHANGE,
    payload: {
      id,
      url: changeInfo.url || undefined,
      title: changeInfo.title ?? undefined
    }
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

const searchNodes = (q: string, id = ''): SearchNodes => {
  return {
    type: ACTIONS.BKM_SRH,
    payload: { q, id }
  };
};

const refreshSrh = (): RefreshSearch => {
  return { type: ACTIONS.BKM_SRH_REF, payload: {} };
};

const duplicatesSearch = (ignoreHash = true): DuplicatesSearch => {
  return {
    type: ACTIONS.BKM_DUP,
    payload: { ignoreHash }
  };
};
const updateDuplicateNodeParentChains = (
  nodes: DataNode[]
): UpdateDuplicateNodeParentChains => {
  return {
    type: ACTIONS.UPD_DUP_PAR_CHAINS,
    payload: { nodes }
  };
};

export {
  rmvNode,
  movNode,
  changeNode,
  reorderNode,
  createNode,
  searchNodes,
  refreshSrh,
  duplicatesSearch,
  updateDuplicateNodeParentChains
};
