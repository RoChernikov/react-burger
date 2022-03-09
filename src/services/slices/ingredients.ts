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

//returns ingredient by its id
export const selectIngredientById = (id: string) => (state: any) => {
  return state.ingredients.ingredients.find(
    (ing: TIngredient) => ing._id === id
  );
};

//returns total price of the order, bun icon and array of the rest of the icons by array of ingredients ids
export const getOrderData = (ids: string[]) => (state: any) => {
  //find ingredients by ids
  const ings = ids.map(id =>
    state.ingredients.ingredients.find((ing: TIngredient) => ing._id === id)
  );
  return {
    //return bun icon
    bunIcon: ings.find(ing => ing.type === 'bun').image_mobile,
    //return the rest of the icons
    restIngIcons: ings
      .filter(ing => ing.type !== 'bun')
      .map(ing => ing.image_mobile),
    //return total price of the order
    totalPrice: ids.reduce((acc, id) => {
      const ingPrice = ings.find((ing: TIngredient) => ing._id === id).price;
      return acc + ingPrice;
    }, ings.find(ing => ing.type === 'bun').price)
  };
};
