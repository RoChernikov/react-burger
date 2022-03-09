import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWsOrder, TOnMessagePayload } from './../../utils/types';
//--------------------------------------------------------------------------------

interface IWsOrdersState {
  wsRequest: boolean;
  wsOpen: boolean;
  wsFailed: boolean;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
}

const initialState: IWsOrdersState = {
  wsRequest: false,
  wsOpen: false,
  wsFailed: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsOrdersSlice = createSlice({
  name: 'wsOrder',
  initialState,
  reducers: {
    wsInit(state) {
      state.wsRequest = true;
      state.wsOpen = false;
      state.wsFailed = false;
    },
    sendMessage(state, action: PayloadAction) {},
    onOpen(state) {
      state.wsRequest = false;
      state.wsOpen = true;
      state.wsFailed = false;
    },
    onClose(state) {
      state.wsRequest = false;
      state.wsOpen = false;
    },
    onError(state) {
      state.wsRequest = false;
      state.wsOpen = false;
      state.wsFailed = true;
    },
    onMessage(state, action: PayloadAction<TOnMessagePayload>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsClose(state) {
      state.wsRequest = false;
      state.wsOpen = false;
      state.wsFailed = false;
    }
  }
});

export const {
  wsInit,
  sendMessage,
  onOpen,
  onClose,
  onError,
  onMessage,
  wsClose
} = wsOrdersSlice.actions;

export const WS_ORDER_ACTION_TYPES = {
  wsInit: wsInit.type,
  wsSendMessage: sendMessage.type,
  onOpen: onOpen.type,
  onClose: onClose.type,
  onError: onError.type,
  onMessage: onMessage.type,
  wsClose: wsClose.type
};
