import { combineReducers } from 'redux';
//import {...} from "./reducers";

//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE
//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE
const FIRST_ACTION = 'FIRST_ACTION';
const SECOND_ACTION = 'SECOND_ACTION';
const firstReducer = (state = {}, action) => {
  switch (action.type) {
    case FIRST_ACTION: {
      return state;
    }
    case SECOND_ACTION: {
      return state;
    }
    default: {
      return state;
    }
  }
};
const secondReducer = (state = {}, action) => {
  switch (action.type) {
    case FIRST_ACTION: {
      return state;
    }
    case SECOND_ACTION: {
      return state;
    }
    default: {
      return state;
    }
  }
};
//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE
//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE

export const rootReducer = combineReducers({ firstReducer, secondReducer });
