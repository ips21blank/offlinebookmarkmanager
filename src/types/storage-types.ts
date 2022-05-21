type STORE_KEY_TYPE =
  | 'icons'
  | 'pins'
  | 'homePin'
  | 'groupBkmFol'
  | 'showFolBkmIcons'
  | 'flowDirection';

const STORE_KEYS = [
  'icons',
  'pins',
  'homePin',
  'groupBkmFol',
  'showFolBkmIcons',
  'flowDirection'
];

interface StorageObject<T> {
  key: STORE_KEY_TYPE;
  val: T;
}

// prettier-ignore
interface SettingsStorage {
  keyObjMap: { [k in STORE_KEY_TYPE]: StorageObject<any> };

  updateStorage(k: STORE_KEY_TYPE, obj: any): any;
}

export type { SettingsStorage, StorageObject, STORE_KEY_TYPE };
export { STORE_KEYS };
