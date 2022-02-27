import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@proj-types/redux-types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
