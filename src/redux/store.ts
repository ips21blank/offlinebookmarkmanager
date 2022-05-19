import { StoreType } from '@proj-types/types';
import { createStore } from 'redux';
import { getRootReducer } from './root-reducer';

let STORE: StoreType = {} as any;

const getStore = (): StoreType => STORE;
const createAndGetStore = async (): Promise<StoreType> =>
  (STORE = createStore(await getRootReducer()));

export { createAndGetStore, getStore };
