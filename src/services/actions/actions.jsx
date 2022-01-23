import Api from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DROP_INGREDIENT = 'DROP_INGREDIENT';
export const DELETE_IGREDIENT = 'DELETE_IGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_IGREDIENT';
export const SELECT_MEAL = 'SELECT_MEAL';
//--------------------------------------------------------------------------------

const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST
  };
};

const getIngredientsSuccess = data => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: {
      ingredients: data
    }
  };
};

const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED
  };
};

export const selectIngredient = ingredient => {
  return {
    type: SELECT_INGREDIENT,
    payload: {
      ingredient: ingredient
    }
  };
};

export const unselectIngredient = () => {
  return {
    type: UNSELECT_INGREDIENT
  };
};

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

const clearOrderList = () => {
  return {
    type: CLEAR_ORDER_LIST
  };
};

export const deleteOrder = () => {
  return {
    type: DELETE_ORDER
  };
};

export const dropIngredient = ingredient => {
  return {
    type: DROP_INGREDIENT,
    payload: { ingredient: { ...ingredient, uid: uuidv4() } }
  };
};

export const deleteIngredient = index => {
  return { type: DELETE_IGREDIENT, payload: { index } };
};

export const reorderIngredient = (targetIndex, dragIndex) => {
  return {
    type: REORDER_INGREDIENT,
    payload: {
      targetIndex: targetIndex,
      dragIndex: dragIndex
    }
  };
};

export const selectMeal = mealName => {
  return {
    type: SELECT_MEAL,
    payload: { mealName }
  };
};

export function getIngredientsApi() {
  return dispatch => {
    dispatch(getIngredientsRequest());
    Api.getIngredients()
      .then(res => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch(err => {
        dispatch(getIngredientsFailed());
        console.log(`${err}`);
      });
  };
}

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
