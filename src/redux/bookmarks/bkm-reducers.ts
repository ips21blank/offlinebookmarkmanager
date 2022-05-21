import { initialStateBkm } from '@redux/initial-states';
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
  UpdateDuplicateNodeParentChains,
  AddIcon,
  RmvIcon
} from '@proj-types/types';
import { browserAPI } from '@scripts/scripts';

export const getBkmReducer = () => {
  return (state = initialStateBkm, action: BookmarkAction): BookmarkState => {
    const saveIconsIfUpdated = () => {
      state.db.iconsWereEdited() && // db remains the same after all events.
        browserAPI.store({ icons: state.db.getIconsSaveData() });
    };

    switch (action.type) {
      case ACTIONS.REMOVE: {
        let payload = (<NodeRemoveAction>action).payload;
        state.db.rmv(payload.id);
        saveIconsIfUpdated();

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
        if (payload.title || payload.title == '') {
          state.db.rnm(payload.id, payload.title);
          saveIconsIfUpdated();
        }

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

      case ACTIONS.ADD_ICO: {
        let payload = (<AddIcon>action).payload;
        state.db.addToIcons(payload.id);
      }

      case ACTIONS.RMV_ICO: {
        // Not required - handled via rename.
        let payload = (<RmvIcon>action).payload;

        return state;
      }

      default:
        return state;
    }
  };
};
