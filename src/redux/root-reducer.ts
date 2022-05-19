import { StoreDataType, GeneralAction } from '@proj-types/types';
import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { getBkmReducer } from './bookmarks/bkm-reducers';
import { settingsReducer } from './settings/settings-reducers';
import { displayReducer } from './display-state/display-reducers';
import { overlayReducer } from './overlay/overlay-reducer';

export const getRootReducer = async () => {
  const bkmReducer = await getBkmReducer();

  const rootReducer: Reducer<StoreDataType, GeneralAction> = combineReducers({
    bookmarks: bkmReducer,
    settings: settingsReducer,
    displayState: displayReducer,
    overlay: overlayReducer
  });

  return rootReducer;
};
