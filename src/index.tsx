import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import state from './services/store';
import { TIngredientActions } from './services/actions/ingredients';
import { TConstructorActions } from './services/actions/constructor';
import { TOrderActions } from './services/actions/order';
//--------------------------------------------------------------------------------

type TApplicationActions =
  | TIngredientActions
  | TConstructorActions
  | TOrderActions;
export type RootState = ReturnType<typeof state.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof state.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
