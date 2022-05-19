import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StoreDataType } from '@proj-types/types';

// THIS IS JUST TYPE CASTING.
// (Use throughout your app instead of plain `useDispatch` and `useSelector`)

// Just type case for each function
// export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<StoreDataType> = useSelector;
