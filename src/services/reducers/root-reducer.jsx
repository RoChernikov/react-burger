import { combineReducers } from 'redux';
import { ingredientsReducer, orderReducer } from './reducers';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer
});
