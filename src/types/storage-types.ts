type STORE_KEY_TYPE =
  | 'icons'
  | 'pins'
  | 'homePin'
  | 'groupBkmFol'
  | 'showFolBkmIcons'
  | 'flowDirection'
  | 'notice';

const STORE_KEYS: STORE_KEY_TYPE[] = [
  'icons',
  'pins',
  'homePin',
  'groupBkmFol',
  'showFolBkmIcons',
  'flowDirection',
  'notice'
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
