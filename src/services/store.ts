import thunk, { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

export type RootState = ReturnType<typeof state.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, Action>
>;
export type AppDispatch = typeof state.dispatch;

const state = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  devTools: process.env.NODE_ENV !== 'production'
});

export default state;
