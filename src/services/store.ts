import thunk, {ThunkAction} from 'redux-thunk';
import {ActionCreator, AnyAction} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './slices';
import {socketMiddleware} from '../middleware/socket-middleware';
import {WS_ORDER_ACTION_TYPES} from './slices/ws-orders';
//--------------------------------------------------------------------------------

export type RootState = ReturnType<typeof state.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, any, AnyAction>
>;

export type AppDispatch = typeof state.dispatch;

const state = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(thunk)
      .concat(
        socketMiddleware(
          'wss://norma.nomoreparties.space/orders/all',
          WS_ORDER_ACTION_TYPES
        )
      ),
  devTools: process.env.NODE_ENV !== 'production'
});

export default state;
