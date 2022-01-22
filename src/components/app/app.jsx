import styles from './app.module.css';
import { useEffect, useCallback } from 'react';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructorDndWrapper from '../burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIngredientsApi,
  getOrderNumber,
  selectIngredient,
  unselectIngredient,
  deleteOrder
} from '../../services/actions/actions';
//--------------------------------------------------------------------------------

const App = () => {
  const dispatch = useDispatch();
  const {
    ingredients,
    selectedIngredient,
    ingredientsFailed,
    ingredientsRequest,
    order,
    orderNumberRequest
  } = useSelector(
    ({
      ingredients: {
        ingredients,
        selectedIngredient,
        ingredientsFailed,
        ingredientsRequest
      },
      order: { order, orderNumberRequest }
    }) => {
      return {
        ingredients,
        selectedIngredient,
        ingredientsFailed,
        ingredientsRequest,
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
      <DndProvider backend={HTML5Backend}>
        {!ingredientsFailed ? (
          <main className={styles.main}>
            <BurgerIngredients openModal={openIngredientDetailsModal} />
            <BurgerConstructorDndWrapper openModal={openOrderDetailsModal} />
          </main>
        ) : (
          <main>
            <section aria-label="Сообщение об ошибке">
              <h1 className="text text_type_main-large mt-20">
                Что-то пошло не так :(
              </h1>
              <p
                className={`text text_type_main-small ${styles.errorSubtitle}`}>
                не удалось загрузить данные с сервера
              </p>
            </section>
          </main>
        )}
      </DndProvider>
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
