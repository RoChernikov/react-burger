import React, { FC } from 'react';
import AppHeader from '../app-header/app-header';
import Homepage from '../../pages/home/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//--------------------------------------------------------------------------------

const App: FC = () => {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
