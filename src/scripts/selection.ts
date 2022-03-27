import { SelectionState } from '@proj-types/types';
import { SELECT_CLASS } from './globals';

class Selection implements SelectionState {
  private _folCount;
  private _bkmCount;
  _folders: Set<string>;
  _bookmarks: Set<string>;

  constructor() {
    this._folCount = 0;
    this._bkmCount = 0;
    this._folders = new Set<string>();
    this._bookmarks = new Set<string>();
  }

  public clear() {
    this._bkmCount = this._folCount = 0;
    this._folders.clear();
    this._bookmarks.clear();

    let elList = document.getElementsByClassName(SELECT_CLASS);
    while (elList.length)
      elList[elList.length - 1].classList.remove(SELECT_CLASS);
  }

  private _selectNode(id: string) {
    let el = document.getElementById(id);
    if (!el) return;

    el.classList.add(SELECT_CLASS);
  }
  private _deSelectNode(id: string) {
    let el = document.getElementById(id);
    if (!el) return;

    el.classList.remove(SELECT_CLASS);
  }

  public addFol(id: string): boolean {
    if (!this.hasFol(id)) {
      this._folders.add(id);
      this._folCount++;
      this._selectNode(id);

      return true;
    }
    return false;
  }
  public addBkm(id: string): boolean {
    if (!this.hasBkm(id)) {
      this._bookmarks.add(id);
      this._bkmCount++;
      this._selectNode(id);

      return true;
    }
    return false;
  }

  public rmvFol(id: string): boolean {
    if (this.hasFol(id)) {
      this._folders.delete(id);
      this._folCount--;
      this._deSelectNode(id);

      return true;
    }
    return false;
  }
  public rmvBkm(id: string): boolean {
    if (this.hasBkm(id)) {
      this._bookmarks.delete(id);
      this._bkmCount--;
      this._deSelectNode(id);

      return true;
    }
    return false;
  }

  public hasFol(id: string): boolean {
    return this._folders.has(id);
  }
  public hasBkm(id: string): boolean {
    return this._bookmarks.has(id);
  }

  public get bkmCount(): number {
    return this._bkmCount;
  }
  public get folCount(): number {
    return this._folCount;
  }
  public get total(): number {
    return this._folCount + this._bkmCount;
  }

  public get folders(): string[] {
    return Array.from(this._folders);
  }
  public get bookmarks(): string[] {
    return Array.from(this._bookmarks);
  }
}

export { Selection };
