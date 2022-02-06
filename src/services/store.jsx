import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducers';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// const composeEnhancers = (window as any)[
//   '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
// ] as typeof compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const state = createStore(rootReducer, enhancer);

export default state;
