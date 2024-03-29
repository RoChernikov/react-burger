import styles from './home.module.scss';
import React, { useCallback, FC } from 'react';
import Loader from '../../components/loader/loader';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructorDndWrapper from '../../components/burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import Message from '../../components/message/message';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { deleteOrder, getOrderNumber } from '../../services/slices/order';
//--------------------------------------------------------------------------------

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const { ingredientsFailed, ingredientsRequest } = useAppSelector(
    state => state.ingredients
  );

  const { order } = useAppSelector(state => state.order);

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

  return ingredientsRequest ? (
    <Loader />
  ) : (
    <>
      {!ingredientsFailed ? (
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructorDndWrapper openModal={openOrderDetailsModal} />
          </DndProvider>
        </main>
      ) : (
        <Message>Не удалось загрузить данные!</Message>
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
