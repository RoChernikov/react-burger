import React, { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getIngredientsApi } from '../../services/slices/ingredients';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ProfilePage from '../../pages/profile/profile';
import FeedPage from '../../pages/feed/feed';
import ForgotPassPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ILocationParams } from '../../utils/interfaces';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
//--------------------------------------------------------------------------------

const App: FC = () => {
  const history = useHistory();
  const closeModal = useCallback(
    (href: string) => {
      history.push(href);
    },
    [history]
  );
  const dispatch = useAppDispatch();

  const { ingredientsSuccess } = useAppSelector(state => state.ingredients);

  useEffect(() => {
    if (!ingredientsSuccess) {
      dispatch(getIngredientsApi());
    }
  }, [dispatch, ingredientsSuccess]);

  let location = useLocation<ILocationParams>();

  let background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route exact path="/login" children={<LoginPage />} />
        <Route exact path="/register" children={<RegisterPage />} />
        <Route exact path="/forgot-password" children={<ForgotPassPage />} />
        <Route exact path="/reset-password" children={<ResetPasswordPage />} />
        <Route exact path="/ingredients/:id" children={<IngredientPage />} />
        <Route exact path="/profile" children={<ProfilePage />} />
        <Route exact path="/feed" children={<FeedPage />} />
        <Route children={<NotFound404 />} />
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={() => closeModal('/')}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
