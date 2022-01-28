import Api from '../../utils/api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';
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

export const selectMeal = mealName => {
  return {
    type: SELECT_MEAL,
    payload: { mealName }
  };
};
