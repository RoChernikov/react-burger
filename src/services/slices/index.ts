import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients';
import { burgerConstructorSlice } from './constructor';
import { orderSlice } from './order';
import { userSlice } from './user';
//--------------------------------------------------------------------------------

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  order: orderSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  user: userSlice.reducer
});
