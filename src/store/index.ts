import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import treeSlice from './TreeSlice';

export const store = configureStore({
  reducer: {
    tree: treeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
