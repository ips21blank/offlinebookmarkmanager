import { StoreDataType, GeneralAction } from '@proj-types/types';
import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { getBkmReducer } from './bookmarks/bkm-reducers';
import { getSettingsReducer } from './settings/settings-reducers';
import { getDisplayReducer } from './display-state/display-reducers';
import { overlayReducer } from './overlay/overlay-reducer';
import { getBkmData, getStorageData, loadStorageData } from '@scripts/scripts';
import {
  initialOverlayState,
  initialStateBkm,
  initialStateDisp,
  initialStateSettings,
  updateBkmDataInitialState,
  updateDispInitialState,
  updateSettingsInitialState
} from './initial-states';

export const getRootReducer = async () => {
  await loadStorageData();
  const bkmData = await getBkmData();
  const storeageData = getStorageData();

  updateBkmDataInitialState(bkmData, storeageData.getStorageData('icons'));
  updateDispInitialState(storeageData);
  updateSettingsInitialState(storeageData);

  const bkmReducer = getBkmReducer();
  const displayReducer = getDisplayReducer();
  const settingsReducer = getSettingsReducer();

  console.log(
    initialStateBkm,
    initialOverlayState,
    initialStateDisp,
    initialStateSettings
  );

  const rootReducer: Reducer<StoreDataType, GeneralAction> = combineReducers({
    bookmarks: bkmReducer,
    settings: settingsReducer,
    displayState: displayReducer,
    overlay: overlayReducer
  });

  return rootReducer;
};
