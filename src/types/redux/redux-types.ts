import { BookmarkAction } from './bookmark-types-actions';
import {
  BookmarkState,
  DisplayAction,
  DisplayState
} from './display-types-actions';
import { OverlayAction, OverlayState } from './overlay-types-actions';
import { Settings, SettingsActions } from './settings-types-actions';

export interface StoreType {
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

export * from './display-types-actions';
export * from './settings-types-actions';
export * from './overlay-types-actions';
export * from './bookmark-types-actions';
export * from './action-types';
