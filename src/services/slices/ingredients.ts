import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import Api from '../../utils/api';
import { TIngredient, TMeal } from '../../utils/types';
//--------------------------------------------------------------------------------

interface ingredientsState {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsSuccess: boolean;
  ingredientsFailed: boolean;
  selectedMeal: TMeal;
}

const initialState: ingredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
  selectedMeal: 'bun'
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest(state) {
      state.ingredientsFailed = false;
      state.ingredientsSuccess = false;
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess(state, action: PayloadAction<Array<TIngredient>>) {
      state.ingredientsFailed = false;
      state.ingredientsRequest = false;
      state.ingredientsSuccess = true;
      state.ingredients = action.payload;
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
      state.ingredientsSuccess = false;
      state.ingredientsRequest = false;
    },
    selectMeal(state, action: PayloadAction<TMeal>) {
      state.selectedMeal = action.payload;
    }
  }
});

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  selectMeal
} = ingredientsSlice.actions;

export const getIngredientsApi: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  Api.getIngredients()
    .then(res => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch(err => {
      dispatch(getIngredientsFailed());
      console.log(err);
    });
};

export const selectIngredientById = (id: any) => (state: any) => {
  return state.ingredients.ingredients.find((ing: any) => ing._id === id);
};
