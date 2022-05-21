import {
  SettingsStorage,
  StorageObject,
  IconObj,
  FLOW_DIRECTION,
  STORE_KEY_TYPE
} from '@proj-types/types';
import { browserAPI } from './browser-api';

class StorageUnit<T> implements StorageObject<T> {
  constructor(public key: STORE_KEY_TYPE, public val: T) {}

  public updateAndSave(obj: T) {
    this.val = obj;
    browserAPI.store({ [this.key]: this.val });
  }
}

class BrowserStorage implements SettingsStorage {
  keyObjMap: { [k in STORE_KEY_TYPE]: StorageUnit<any> };

  constructor(data: { [k in STORE_KEY_TYPE]: any }) {
    let icons: IconObj = this.parseJson(data['icons'], {});

    let pins: string[] =
      (Array.isArray(data['pins']) && data['pins']) ||
      this.parseJson(data['pins'], []);
    let homePin: string = data['homePin'] ?? '';

    let groupBkmFol: boolean = Boolean(data['groupBkmFol']) || false;
    let showFolBkmIcons: boolean = Boolean(data['showFolBkmIcons']) || false;
    let flowDirection: FLOW_DIRECTION =
      parseInt(data['flowDirection']) ?? FLOW_DIRECTION.COLUMN;

    this.keyObjMap = {
      icons: new StorageUnit('icons', icons),
      pins: new StorageUnit('pins', pins),
      homePin: new StorageUnit('homePin', homePin),
      groupBkmFol: new StorageUnit('groupBkmFol', groupBkmFol),
      showFolBkmIcons: new StorageUnit('showFolBkmIcons', showFolBkmIcons),
      flowDirection: new StorageUnit('flowDirection', flowDirection)
    };
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
