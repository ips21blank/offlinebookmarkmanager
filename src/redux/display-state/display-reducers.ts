import {
  UpdateCurrLocation,
  UpdateColumnCount,
  DisplayAction,
  DisplayState,
  SelectDeselectNode,
  ACTIONS,
  StartDrag,
  HighlightElementsMoved,
  ChangeEditMode,
  DISP_MODES,
  FolPageData,
  PAGE_TYPE,
  ShowRecentPage
} from '@proj-types/types';
import { initialStateDisp } from '@redux/initial-states';
import { browserAPI } from '@scripts/scripts';

export const getDisplayReducer = () => {
  return (
    state: DisplayState = initialStateDisp,
    action: DisplayAction
  ): DisplayState => {
    switch (action.type) {
      case ACTIONS.SET_CURR_LOCATION: {
        let payload = (<UpdateCurrLocation>action).payload;

        return payload.newLocation ===
          (state.pageData as FolPageData).currLocation &&
          state.pageType === PAGE_TYPE.FOL
          ? state
          : {
              ...state,
              pageType: PAGE_TYPE.FOL,
              pageData: {
                currLocation: payload.newLocation,
                prevPage: state.pageType,
                showNode: payload.showNode
              }
            };
      }

      case ACTIONS.SHOW_SRH_PG: {
        // This does not alter data of the page. So prev page can be show properly.
        return {
          ...state,
          pageType: PAGE_TYPE.SRH,
          pageData: { ...state.pageData, prevPage: state.pageType }
        };
      }

      case ACTIONS.SHOW_REC_PG: {
        let payload = (<ShowRecentPage>action).payload;

        return {
          ...state,
          pageType: PAGE_TYPE.REC,
          pageData: {
            prevPage: state.pageType,
            i1: payload.i,
            count: payload.count
          }
        };
      }

      case ACTIONS.SHOW_DUP_PG: {
        return {
          ...state,
          pageType: PAGE_TYPE.DUP,
          pageData: { prevPage: state.pageType }
        };
      }

      case ACTIONS.SHOW_PREV_PG: {
        return {
          ...state,
          pageType: state.pageData.prevPage,
          pageData: { ...state.pageData, prevPage: state.pageType }
        };
      }

      case ACTIONS.UPDATE_COL_COUNT: {
        let payload = (<UpdateColumnCount>action).payload;

        // Do nothing of noOfColumns is 0.
        return payload.noOfColumns && payload.noOfColumns !== state.noOfColumns
          ? { ...state, noOfColumns: payload.noOfColumns }
          : state;
      }

      case ACTIONS.SELECT_DESELECT_NODE: {
        let payload = (<SelectDeselectNode>action).payload,
          id = payload.nodeId,
          sel = state.selection;

        if (!id) {
          sel.clear();
        } else if (payload.isBkm) {
          sel.addBkm(id) || (!payload.doNotDeselect && sel.rmvBkm(id));
        } else {
          sel.addFol(id) || (!payload.doNotDeselect && sel.rmvFol(id));
        }

        // The bookmarks or folders are supposed to keep track of whether they
        // have been selected or not. The reference however is updated to update
        // dragElement.
        // This aspect of their state is not updated using store. Store is used
        // to simply keep data to be used by different functions.
        return { ...state };
      }

      case ACTIONS.START_DRAG: {
        let payload = (<StartDrag>action).payload;

        return { ...state, dragId: payload.nodeId };
      }

      case ACTIONS.END_DRAG: {
        return { ...state, dragId: '' };
      }

      case ACTIONS.ELEMENTS_MOVED: {
        let payload = (<HighlightElementsMoved>action).payload;
        return { ...state, elementsMoved: payload.idList };
      }

      case ACTIONS.TOGGLE_DISP_MODE: {
        let mode =
          (<ChangeEditMode>action).payload.mode ??
          (state.mode === DISP_MODES.VIEW ? DISP_MODES.EDIT : DISP_MODES.VIEW);

        if (mode === DISP_MODES.VIEW) state.selection.clear();

        return { ...state, mode };
      }

      case ACTIONS.TOGGLE_GROUPING: {
        browserAPI.store({ groupBkmFol: !state.groupBkmFol });
        return { ...state, groupBkmFol: !state.groupBkmFol };
      }

      default:
        return state;
    }
  };
};
