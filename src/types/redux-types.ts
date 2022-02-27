import { DataBase } from '@scripts/db';
import { BrowserAction } from './browser-types';
import { Settings, SettingsActions } from './settings-types';

export interface StoreType {
  settings: Settings;
  bookmarks: DataBase;
}

export type GeneralAction = SettingsActions | BrowserAction;
