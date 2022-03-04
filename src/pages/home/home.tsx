import styles from './home.module.css';
import React, { useCallback, FC } from 'react';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructorDndWrapper from '../../components/burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { deleteOrder, getOrderNumber } from '../../services/slices/order';
import OrderInfo from '../../components/order-info/order-info';
//--------------------------------------------------------------------------------

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const { ingredientsFailed, ingredientsRequest } = useAppSelector(
    state => state.ingredients
  );

  const { order, orderNumberRequest } = useAppSelector(state => state.order);

  const openOrderDetailsModal = useCallback(
    selectedIngredients => {
      dispatch(
        getOrderNumber(
          selectedIngredients.map(
            (ingredient: { _id: string }) => ingredient._id
          )
        )
      );
    },
    [dispatch]
  );

  const closeOrderDetailsModal = useCallback(() => {
    dispatch(deleteOrder());
  }, [dispatch]);

  return ingredientsRequest || orderNumberRequest ? (
    <Loader />
  ) : (
    <>
      {!ingredientsFailed ? (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructorDndWrapper openModal={openOrderDetailsModal} />
          </DndProvider>
        </main>
      ) : (
        <main className={styles.errorMain}>
          <DeveloperGuy>Не удалось загрузить данные!</DeveloperGuy>
        </main>
      )}
      {order && (
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails orderNumber={order.order.number} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
