import Api from '../../utils/api';
import { AppDispatch, AppThunk } from '../..';
import { burgerConstructorSlice } from '../slices/burger-constructor';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER = 'DELETE_ORDER';
//--------------------------------------------------------------------------------

export interface IGetOrderNumberRequest {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccess {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly order: number;
}

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions =
  | IGetOrderNumberRequest
  | IGetOrderNumberSuccess
  | IGetOrderNumberFailed
  | IDeleteOrder;

const getOrderNumberRequest = (): IGetOrderNumberRequest => {
  return {
    type: GET_ORDER_NUMBER_REQUEST
  };
};

const getOrderNumberSuccess = (order: number): IGetOrderNumberSuccess => {
  return {
    type: GET_ORDER_NUMBER_SUCCESS,
    order
  };
};

const getOrderNumberFailed = (): IGetOrderNumberFailed => {
  return {
    type: GET_ORDER_NUMBER_FAILED
  };
};

export const deleteOrder = (): IDeleteOrder => {
  return {
    type: DELETE_ORDER
  };
};

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
