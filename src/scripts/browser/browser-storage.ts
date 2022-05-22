import {
  SettingsStorage,
  StorageObject,
  FLOW_DIRECTION,
  STORE_KEY_TYPE,
  IconSaveData
} from '@proj-types/types';
import { NULL_NOTICE } from '@scripts/globals';
import { browserAPI } from './browser-api';

class StorageUnit<T> implements StorageObject<T> {
  constructor(public key: STORE_KEY_TYPE, public val: T) {}

  public update(obj: T) {
    this.val = obj;
  }
  public saveVal(obj: T) {
    browserAPI.store({ [this.key]: obj });
  }
  public updateAndSave(obj: T) {
    this.update(obj);
    this.saveVal(obj);
  }
}

class BrowserStorage implements SettingsStorage {
  keyObjMap: { [k in STORE_KEY_TYPE]: StorageUnit<any> };

  constructor(data: { [k in STORE_KEY_TYPE]: any }) {
    let icons: IconSaveData = data['icons'] || {};

    let pins: string[] =
      (Array.isArray(data['pins']) && data['pins']) ||
      this.parseJson(data['pins'], []);
    let homePin: string = data['homePin'] ?? '';

    let groupBkmFol: boolean = Boolean(data['groupBkmFol']) || false;
    let showFolBkmIcons: boolean = Boolean(data['showFolBkmIcons']) || false;
    let flowDirection: FLOW_DIRECTION =
      parseInt(data['flowDirection']) ?? FLOW_DIRECTION.COLUMN;

    let notice: string = data['notice'] ?? '';

    this.keyObjMap = {
      icons: new StorageUnit('icons', icons),
      pins: new StorageUnit('pins', pins),
      homePin: new StorageUnit('homePin', homePin),
      groupBkmFol: new StorageUnit('groupBkmFol', groupBkmFol),
      showFolBkmIcons: new StorageUnit('showFolBkmIcons', showFolBkmIcons),
      flowDirection: new StorageUnit('flowDirection', flowDirection),
      notice: new StorageUnit('notice', notice)
    };

    // Notices currently are being shown only once.
    if (this.keyObjMap.notice.val !== NULL_NOTICE) {
      this.keyObjMap.notice.saveVal(NULL_NOTICE);
    }
  }

  parseJson(json: string, defaultVal: any) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return defaultVal;
    }
  }

  updateStorage(k: STORE_KEY_TYPE, obj: any) {
    this.keyObjMap[k].updateAndSave(obj);
  }
  getStorageData(k: STORE_KEY_TYPE) {
    return this.keyObjMap[k].val;
  }
}

export { BrowserStorage };
