import { DataBase } from '@scripts/db';
import { BrowserAction } from './browser-types';
import { BookmarkState, DisplayAction, DisplayState } from './display-types';
import { Settings, SettingsActions } from './settings-types';

export interface StoreType {
  settings: Settings;
  bookmarks: BookmarkState;
  displayState: DisplayState;
}

export type GeneralAction = SettingsActions | BrowserAction | DisplayAction;
