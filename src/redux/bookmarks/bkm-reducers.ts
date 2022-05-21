import {
  initialStateBkm,
  updateBkmDataInitialState
} from '@redux/initial-states';
import {
  ACTIONS,
  BookmarkAction,
  NodeRemoveAction,
  NodeMoveAction,
  NodeChangeAction,
  NodesReorderedAction,
  NodeCreateAction,
  BookmarkState,
  SearchNodes,
  RefreshSearch,
  DuplicatesSearch,
  UpdateDuplicateNodeParentChains
} from '@proj-types/types';

export const getBkmReducer = () => {
  return (state = initialStateBkm, action: BookmarkAction): BookmarkState => {
    switch (action.type) {
      case ACTIONS.REMOVE: {
        let payload = (<NodeRemoveAction>action).payload;
        state.db.rmv(payload.id);

        return { ...state, searchPromise: state.db.getCachedSrhResult() };
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

        return { ...state, searchPromise: state.db.getCachedSrhResult() };
      }

      case ACTIONS.BKM_SRH: {
        let payload = (<SearchNodes>action).payload;
        const orderedNodesPromise = state.db.search(payload.id, payload.q);

        return { ...state, searchPromise: orderedNodesPromise };
      }

      case ACTIONS.BKM_SRH_REF: {
        let payload = (<RefreshSearch>action).payload;
        const searchPromise = state.db.refreshSearch();

        return { ...state, searchPromise };
      }

      case ACTIONS.BKM_DUP: {
        let payload = (<DuplicatesSearch>action).payload;
        const duplicatesPromise = state.db.getDuplicates(payload.ignoreHash);

        return { ...state, duplicatesPromise };
      }

      case ACTIONS.UPD_DUP_PAR_CHAINS: {
        let payload = (<UpdateDuplicateNodeParentChains>action).payload;
        state.db.addParentChains(payload.nodes);

        return { ...state };
      }

      default:
        return state;
    }
  };
};
