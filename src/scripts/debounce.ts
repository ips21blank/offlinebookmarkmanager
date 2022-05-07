import { useState } from 'react';

class DebounceCheck {
  constructor(public delay: number, private _observable: { obs: any }) {}

  public set obsVal(obs: any) {
    this._observable.obs = obs;
  }

  public debounce(callBack: Function) {
    const initialVal = this._observable.obs;
    setTimeout(() => {
      if (initialVal == this._observable.obs) callBack();
      else console.log('Bounced!');
    }, this.delay);
  }
}

export { DebounceCheck };
