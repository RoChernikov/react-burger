import styles from './app.module.css';
import React, { useEffect, useCallback, FC } from 'react';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructorDndWrapper from '../burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  getIngredientsApi,
  ingredientsSlice
} from '../../services/slices/ingredients';
import { orderSlice, getOrderNumber } from '../../services/slices/order';
//--------------------------------------------------------------------------------

const App = () => {
  const dispatch = useAppDispatch();

  const { deleteOrder } = orderSlice.actions;

  const { selectIngredient, unselectIngredient } = ingredientsSlice.actions;

  const { selectedIngredient, ingredientsFailed, ingredientsRequest } =
    useAppSelector(state => state.ingredients);

  const { order, orderNumberRequest } = useAppSelector(state => state.order);

  const openIngredientDetailsModal = useCallback(
    ingredient => {
      dispatch(selectIngredient(ingredient));
    },
    [dispatch, selectIngredient]
  );

  const closeIngredientDetailsModal = useCallback(() => {
    dispatch(unselectIngredient());
  }, [dispatch, unselectIngredient]);

  const openOrderDetailsModal = useCallback(
    selectedIngredients => {
      dispatch(
        getOrderNumber(selectedIngredients.map(ingredient => ingredient._id))
      );
    },
    [dispatch, getOrderNumber]
  );

  const closeOrderDetailsModal = useCallback(() => {
    dispatch(deleteOrder());
  }, [dispatch, deleteOrder]);

  useEffect(() => {
    dispatch(getIngredientsApi());
  }, [dispatch]);

  return ingredientsRequest || orderNumberRequest ? (
    <Loader />
  ) : (
    <>
      <AppHeader />

      {!ingredientsFailed ? (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openIngredientDetailsModal} />
            <BurgerConstructorDndWrapper openModal={openOrderDetailsModal} />
          </DndProvider>
        </main>
      ) : (
        <main>
          <section aria-label="Сообщение об ошибке">
            <h1 className="text text_type_main-large mt-20">
              Что-то пошло не так :(
            </h1>
            <p className={`text text_type_main-small ${styles.errorSubtitle}`}>
              не удалось загрузить данные с сервера
            </p>
          </section>
        </main>
      )}
      {selectedIngredient && (
        <Modal closeModal={closeIngredientDetailsModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      {order && (
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails order={order.number} />
        </Modal>
      )}
    </>
  );
};

export default App;
