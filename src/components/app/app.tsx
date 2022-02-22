import React, { FC } from 'react';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ProfilePage from '../../pages/profile/profile';
import FeedPage from '../../pages/feed/feed';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ILocationParams } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const App: FC = () => {
  let location = useLocation<ILocationParams>();

  let background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route exact path="/login" children={<LoginPage />} />
        <Route exact path="/register" children={<RegisterPage />} />
        <Route
          exact
          path="/forgot-password"
          children={<ForgotPasswordPage />}
        />
        <Route exact path="/reset-password" children={<ResetPasswordPage />} />
        <Route exact path="/ingredients/:id" children={<IngredientPage />} />
        <Route exact path="/profile" children={<ProfilePage />} />
        <Route exact path="/feed" children={<FeedPage />} />
        <Route children={<NotFound404 />} />
      </Switch>
    </>
  );
};

export default App;
