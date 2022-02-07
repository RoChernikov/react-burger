import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../..';
import Api from '../../utils/api';
import { burgerConstructorSlice } from './constructor';
//--------------------------------------------------------------------------------

interface orderState {
  order: number | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
}

const initialState: orderState = {
  order: null,
  orderNumberRequest: false,
  orderNumberFailed: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderNumberRequest(state) {
      state.orderNumberRequest = true;
    },
    getOrderNumberSuccess(state, action: PayloadAction<number>) {
      state.orderNumberRequest = false;
      state.orderNumberFailed = false;
      state.order = action.payload;
    },
    getOrderNumberFailed(state) {
      state.orderNumberFailed = true;
    },
    deleteOrder(state) {
      state.order = null;
    }
  }
});

const { getOrderNumberRequest, getOrderNumberSuccess, getOrderNumberFailed } =
  orderSlice.actions;

export const getOrderNumber: AppThunk =
  (selectedIngredients: string[]) => (dispatch: AppDispatch) => {
    const { clearOrderList } = burgerConstructorSlice.actions;
    dispatch(getOrderNumberRequest());
    Api.sendOrder(selectedIngredients)
      .then(res => {
        dispatch(getOrderNumberSuccess(res.order));
        dispatch(clearOrderList());
      })
      .catch(err => {
        dispatch(getOrderNumberFailed());
        console.log(`${err}`);
      });
  };
