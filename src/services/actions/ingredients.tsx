import Api from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { AppDispatch, AppThunk } from '../..';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';
export const SELECT_MEAL = 'SELECT_MEAL';
//--------------------------------------------------------------------------------

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISelectIngredients {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IUnselectIngredient {
  readonly type: typeof UNSELECT_INGREDIENT;
}

export interface ISelectMeal {
  readonly type: typeof SELECT_MEAL;
  readonly mealName: string;
}

export type TIngredientActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | ISelectIngredients
  | IUnselectIngredient
  | ISelectMeal;

const getIngredientsRequest = (): IGetIngredientsRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST
  };
};

const getIngredientsSuccess = (
  ingredients: TIngredient[]
): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
  };
};

const getIngredientsFailed = (): IGetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED
  };
};

export const selectIngredient = (
  ingredient: TIngredient
): ISelectIngredients => {
  return {
    type: SELECT_INGREDIENT,
    ingredient
  };
};

export const unselectIngredient = (): IUnselectIngredient => {
  return {
    type: UNSELECT_INGREDIENT
  };
};

export const getIngredientsApi: AppThunk = () => (dispatch: AppDispatch) => {
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

export const selectMeal = (mealName: string): ISelectMeal => {
  return {
    type: SELECT_MEAL,
    mealName
  };
};
