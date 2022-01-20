import { combineReducers } from 'redux';
import {
  ingredientsReducer,
  orderReducer,
  burgerConstructorReducer
} from './reducers';
//--------------------------------------------------------------------------------

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
});
