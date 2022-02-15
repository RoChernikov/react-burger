import React, { FC } from 'react';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ProfilePage from '../../pages/profile/profile';
import FeedPage from '../../pages/feed/feed';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
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
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPasswordPage />
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
