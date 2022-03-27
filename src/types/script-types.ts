interface SelectionState {
  readonly folCount: number;
  readonly bkmCount: number;
  readonly total: number;
  readonly folders: string[];
  readonly bookmarks: string[];

  addFol(id: string): boolean;
  addBkm(id: string): boolean;

  rmvFol(id: string): boolean;
  rmvBkm(id: string): boolean;

  hasFol(id: string): boolean;
  hasBkm(id: string): boolean;

  clear(): void;
}

export type { SelectionState };
