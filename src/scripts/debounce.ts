import { useState } from 'react';

class DebounceCheck {
  constructor(public delay: number, private _observable: { obs: any }) {}

  public set obsVal(obs: any) {
    this._observable.obs = obs;
  }

  public debounce(callBack: Function) {
    const initialVal = this._observable.obs;
    setTimeout(
      () => initialVal == this._observable.obs && callBack(),
      this.delay
    );
  }
}

export { DebounceCheck };
