import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import state from './services/store';
//--------------------------------------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <Router basename="react-burger">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
