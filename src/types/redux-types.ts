import { DataBase } from '@scripts/db';
import { BrowserAction } from './browser-types';
import { DisplayAction, DisplayState } from './display-types';
import { Settings, SettingsActions } from './settings-types';

export interface StoreType {
  settings: Settings;
  bookmarks: DataBase;
  displayState: DisplayState;
}

export type GeneralAction = SettingsActions | BrowserAction | DisplayAction;
