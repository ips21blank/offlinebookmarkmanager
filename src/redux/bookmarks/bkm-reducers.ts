import { DataBase } from '@scripts/db';
import { initialStateDB } from '@redux/initial-states';
import {
  BR_ACTIONS_TYPES as ACTIONS,
  BrowserAction,
  NodeRemoveAction,
  NodeMoveAction,
  NodeChangeAction,
  NodesReorderedAction,
  NodeCreateAction
} from '@proj-types/types';

export const bkmReducer = (
  state = initialStateDB,
  action: BrowserAction
): DataBase => {
  switch (action.type) {
    case ACTIONS.REMOVE: {
      let payload = (<NodeRemoveAction>action).payload;
      return state.rmv(payload.id);
    }
    case ACTIONS.MOVE: {
      let payload = (<NodeMoveAction>action).payload;
      return state.mov(payload.id, payload.newParentId, payload.index);
    }
    case ACTIONS.CHANGE: {
      let payload = (<NodeChangeAction>action).payload;

      payload.url && state.url(payload.id, payload.url);
      payload.title && state.url(payload.id, payload.title);

      return state;
    }
    case ACTIONS.REORDER: {
      let payload = (<NodesReorderedAction>action).payload;
      return state.reorder(payload.id, payload.childIds);
    }
    case ACTIONS.CREATE: {
      let payload = (<NodeCreateAction>action).payload;
      return state.add(payload.node);
    }
    default:
      return state;
  }
};
