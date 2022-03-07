import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppDispatch } from '../../services/store';
import { TWsOrder, TStatus } from './../../utils/types';
//--------------------------------------------------------------------------------

interface IWsOrdersState {
  wsStatus: TStatus;
  wsConnected: boolean;
  orders: TWsOrder[] | undefined;
  totalSum: number | undefined;
  totalSumToday: number | undefined;
}

const initialState: IWsOrdersState = {
  wsStatus: 'success',
  wsConnected: false,
  orders: undefined,
  totalSum: undefined,
  totalSumToday: undefined
};

export const wsOrdersSlice = createSlice({
  name: 'wsOrder',
  initialState,
  reducers: {
    wsInit(state) {
      state.wsStatus = 'pending';
    },
    sendMessage(state, action: PayloadAction) {},
    onOpen(state) {
      state.wsStatus = 'success';
      state.wsConnected = true;
    },
    onClose(state) {
      state.wsConnected = false;
    },
    onError(state) {
      state.wsStatus = 'failed';
      state.wsConnected = false;
    },
    onMessage(state) {}
  }
});

export const { wsInit } = wsOrdersSlice.actions;

export const WS_ORDER_ACTION_TYPES = {
  wsInit: wsInit().type,
  wsSendMessage: 'wsOrder/sendMessage',
  onOpen: 'wsOrder/onOpen',
  onClose: 'wsOrder/onClose',
  onError: 'wsOrder/onError',
  onMessage: 'wsOrder/onMessage'
};
