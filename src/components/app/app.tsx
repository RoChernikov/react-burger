import React, { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getIngredientsApi } from '../../services/slices/ingredients';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ProfilePage from '../../pages/profile/profile';
import OrderFeedPage from '../../pages/order-feed/order-feed';
import ForgotPassPage from '../../pages/forgot-password/forgot-password';
import ResetPassPage from '../../pages/reset-password/reset-password';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import OrderInfoPage from '../../pages/order-info/order-info';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { ILocationParams } from '../../utils/interfaces';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
//--------------------------------------------------------------------------------

import { wsInit } from '../../services/slices/ws-orders';

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

  const location = useLocation<ILocationParams>();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(wsInit());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route exact path="/login" children={<LoginPage />} />
        <Route exact path="/register" children={<RegisterPage />} />
        <Route exact path="/forgot-password" children={<ForgotPassPage />} />
        <Route exact path="/reset-password" children={<ResetPassPage />} />
        <Route exact path="/ingredients/:id" children={<IngredientPage />} />
        <Route exact path="/feed" children={<OrderFeedPage />} />
        <Route exact path="/feed/:id" children={<OrderInfoPage />} />
        <ProtectedRoute
          path="/profile/orders/:id"
          children={<OrderInfoPage />}
        />
        <ProtectedRoute path="/profile" children={<ProfilePage />} />
        <Route children={<NotFound404 />} />
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={() => closeModal('/')}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal closeModal={() => closeModal('/feed')}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal closeModal={() => closeModal('/profile/orders')}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
