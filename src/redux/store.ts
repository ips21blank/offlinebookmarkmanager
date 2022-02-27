import { BrowserAction, GeneralAction, StoreType } from '@proj-types/types';
import { DataBase } from '@scripts/db';
import { createStore, Store } from 'redux';
// import { bkmReducer } from './bookmarks/bkm-reducers';
import { rootReducer } from './root-reducer';

const store: Store<StoreType, GeneralAction> = createStore(rootReducer);

export { store };
