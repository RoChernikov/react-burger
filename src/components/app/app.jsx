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
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import {
  getIngredientsApi,
  ingredientsSlice
} from '../../services/slices/ingredients';
import { getOrderNumber, deleteOrder } from '../../services/actions/order';
//--------------------------------------------------------------------------------

const App = () => {
  const dispatch = useAppDispatch();

  const { selectIngredient, unselectIngredient } = ingredientsSlice.actions;

  const { selectedIngredient, ingredientsFailed, ingredientsRequest } =
    useAppSelector(state => state.ingredients);

  const { order, orderNumberRequest } = useSelector(
    ({ order: { order, orderNumberRequest } }) => {
      return {
        order,
        orderNumberRequest
      };
    }
  );

  const openIngredientDetailsModal = useCallback(
    ingredient => {
      dispatch(selectIngredient(ingredient));
    },
    [dispatch]
  );

  const closeIngredientDetailsModal = useCallback(() => {
    dispatch(unselectIngredient());
  }, [dispatch]);

  const openOrderDetailsModal = useCallback(
    selectedIngredients => {
      dispatch(
        getOrderNumber(selectedIngredients.map(ingredient => ingredient._id))
      );
    },
    [dispatch]
  );

  const closeOrderDetailsModal = useCallback(() => {
    dispatch(deleteOrder());
  }, [dispatch]);

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
      {selectedIngredient._id && (
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
