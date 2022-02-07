import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsSlice } from '../slices/ingredients';
import { burgerConstructorSlice } from '../slices/burger-constructor';
//--------------------------------------------------------------------------------

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorSlice.reducer
});
