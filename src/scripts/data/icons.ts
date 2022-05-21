import { IconObj, IconData, IconSaveData } from '@proj-types/types';

class Icons {
  // private _defaultIcon: IconData = { upper: '', lower: '' };
  private _icons: IconObj = {};
  private _isChanged: boolean = false;

  constructor(private saveData: IconSaveData) {
    for (let k in saveData) {
      this._icons[k] = {
        lower: saveData[k],
        upper: saveData[k].toUpperCase()
      };
    }
  }

  public get edited() {
    return this._isChanged;
  }

  public get(id: string): IconData | undefined {
    return this._icons[id];
  }
  public getTitle(id: string): string {
    return this.get(id)?.lower || '';
  }
  public getTitleUpper(id: string): string {
    // const ico = this.get(id);
    // return ico.lower ? ico.upper || (ico.upper = ico.lower.toUpperCase()) : '';
    return this.get(id)?.upper || '';
  }

  public addIco(id: string, title: string) {
    this.saveData[id] = title;
    this._icons[id] = { lower: title, upper: title.toUpperCase() };
    this._isChanged = true;
  }
  public setTitle(id: string, title: string) {
    // Not being updated: should not be called ever.
    const ico = this._icons[id];
    if (!ico) return;

    this.saveData[id] = ico.lower;
    ico.lower = title;
    ico.upper = title.toUpperCase();
  }

  public rmvIco(id: string) {
    if (!this.get(id)) return;
    delete this._icons[id];
    delete this.saveData[id];
    this._isChanged = true;
  }

  public getSaveData() {
    this._isChanged = false;
    return this.saveData;
  }
}

export { Icons };
