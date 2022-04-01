import { BrowserAction } from './browser-types';
import { BookmarkState, DisplayAction, DisplayState } from './display-types';
import { OverlayAction, OverlayState } from './overlay-types';
import { Settings, SettingsActions } from './settings-types';

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
