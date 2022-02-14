import React, { FC } from 'react';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import ProfilePage from '../../pages/profile/profile';
import FeedPage from '../../pages/feed/feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//--------------------------------------------------------------------------------

const App: FC = () => {
  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/feed" exact>
            <FeedPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
