import { BrowserAction } from './browser-types';
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
  | BrowserAction
  | DisplayAction
  | OverlayAction;
