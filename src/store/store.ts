import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './features/slice-board';
import modalSlice from './features/slice-modal';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    boardSlice,
    modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
