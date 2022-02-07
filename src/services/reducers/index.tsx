import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { burgerConstructorSlice } from '../slices/burger-constructor';
//--------------------------------------------------------------------------------

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorSlice.reducer
});
