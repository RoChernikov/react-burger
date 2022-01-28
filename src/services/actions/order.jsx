import Api from '../../utils/api';
import { clearOrderList } from './constructor';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER = 'DELETE_ORDER';
//--------------------------------------------------------------------------------

const getOrderNumberRequest = () => {
  return {
    type: GET_ORDER_NUMBER_REQUEST
  };
};

const getOrderNumberSuccess = order => {
  return {
    type: GET_ORDER_NUMBER_SUCCESS,
    payload: {
      order: order
    }
  };
};

const getOrderNumberFailed = () => {
  return {
    type: GET_ORDER_NUMBER_FAILED
  };
};

export const deleteOrder = () => {
  return {
    type: DELETE_ORDER
  };
};

export function getOrderNumber(selectedIngredients) {
  return dispatch => {
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
}
