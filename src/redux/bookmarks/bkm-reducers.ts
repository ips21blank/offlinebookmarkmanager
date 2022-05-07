import { initialStateBkm } from '@redux/initial-states';
import {
  ACTIONS,
  BookmarkAction,
  NodeRemoveAction,
  NodeMoveAction,
  NodeChangeAction,
  NodesReorderedAction,
  NodeCreateAction,
  BookmarkState
} from '@proj-types/types';

export const bkmReducer = (
  state = initialStateBkm,
  action: BookmarkAction
): BookmarkState => {
  switch (action.type) {
    case ACTIONS.REMOVE: {
      let payload = (<NodeRemoveAction>action).payload;
      state.db.rmv(payload.id);

      return { ...state };
    }
    case ACTIONS.MOVE: {
      let payload = (<NodeMoveAction>action).payload;
      state.db.mov(payload.id, payload.newParentId, payload.index);

      return { ...state };
    }
    case ACTIONS.CHANGE: {
      let payload = (<NodeChangeAction>action).payload;

      payload.url && state.db.url(payload.id, payload.url);
      (payload.title || payload.title == '') &&
        state.db.rnm(payload.id, payload.title);

      return { ...state };
    }
    case ACTIONS.REORDER: {
      let payload = (<NodesReorderedAction>action).payload;
      state.db.reorder(payload.id, payload.childIds);

      return { ...state };
    }
    case ACTIONS.CREATE: {
      let payload = (<NodeCreateAction>action).payload;
      state.db.add(payload.node);

      return { ...state };
    }
    default:
      return state;
  }
};
