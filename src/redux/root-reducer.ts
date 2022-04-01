import { StoreType, GeneralAction } from '@proj-types/types';
import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { bkmReducer } from './bookmarks/bkm-reducers';
import { settingsReducer } from './settings/settings-reducers';
import { displayReducer } from './display-state/display-reducers';
import { overlayReducer } from './overlay/overlay-reducer';

export const rootReducer: Reducer<StoreType, GeneralAction> = combineReducers({
  bookmarks: bkmReducer,
  settings: settingsReducer,
  displayState: displayReducer,
  overlay: overlayReducer
});
