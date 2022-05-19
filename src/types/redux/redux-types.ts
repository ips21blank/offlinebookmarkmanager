import { BookmarkAction } from './bookmark-types-actions';
import { BookmarkState, DisplayAction, DisplayState } from '@proj-types/types';
import { OverlayAction, OverlayState } from './overlay-types-actions';
import { Settings, SettingsActions } from './settings-types-actions';
import { Store } from 'redux';

export interface StoreDataType {
  settings: Settings;
  bookmarks: BookmarkState;
  displayState: DisplayState;
  overlay: OverlayState;
}

export type GeneralAction =
  | SettingsActions
  | BookmarkAction
  | DisplayAction
  | OverlayAction;

export type StoreType = Store<StoreDataType, GeneralAction>;

export * from './display-types-actions';
export * from './settings-types-actions';
export * from './overlay-types-actions';
export * from './bookmark-types-actions';
export * from './action-types';
