import Api from '../../utils/api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DROP_INGREDIENT = 'DROP_INGREDIENT';
export const DELETE_IGREDIENT = 'DELETE_IGREDIENT';
export const REORDER_IGREDIENT = 'REORDER_IGREDIENT';
//--------------------------------------------------------------------------------

export function getIngredientsApi() {
  return dispatch => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    Api.getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: {
            ingredients: res.data
          }
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

export function getOrderNumber(selectedIngredients) {
  return dispatch => {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });
    Api.sendOrder(selectedIngredients).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: {
            order: res.order
          }
        });
      } else {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        });
      }
    });
  };
}
