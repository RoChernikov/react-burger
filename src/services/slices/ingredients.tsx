import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../..';
import Api from '../../utils/api';
import { TIngredient, TMeal } from '../../utils/types';
//--------------------------------------------------------------------------------

interface ingredientsState {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  selectedIngredient: TIngredient | null;
  selectedMeal: TMeal;
}

const initialState: ingredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  selectedIngredient: null,
  selectedMeal: 'bun'
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest(state) {
      state.ingredientsFailed = false;
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess(state, action: PayloadAction<Array<TIngredient>>) {
      state.ingredientsFailed = false;
      state.ingredientsRequest = false;
      state.ingredients = action.payload;
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
    },
    selectIngredient(state, action: PayloadAction<TIngredient>) {
      state.selectedIngredient = action.payload;
    },
    unselectIngredient(state) {
      state.selectedIngredient = null;
    },
    selectMeal(state, action: PayloadAction<TMeal>) {
      state.selectedMeal = action.payload;
    }
  }
});

const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed } =
  ingredientsSlice.actions;

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
