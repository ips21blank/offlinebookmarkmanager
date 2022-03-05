import { GeneralAction, StoreType } from '@proj-types/types';
import { createStore, Store } from 'redux';
import { rootReducer } from './root-reducer';

const store: Store<StoreType, GeneralAction> = createStore(rootReducer);

export { store };
