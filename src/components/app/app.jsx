import styles from './app.module.css';
import { useEffect, useState, useCallback } from 'react';
import Api from '../../utils/api';
import Loader from '../loader/loader';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../services/ingredients-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  getIngredientsApi
} from '../../services/actions/actions';

const App = () => {
  const dispatch = useDispatch();
  const {
    ingredients,
    selectedIngredient,
    ingredientsFailed,
    ingredientsRequest
  } = useSelector(
    ({
      ingredients: {
        ingredients,
        selectedIngredient,
        ingredientsFailed,
        ingredientsRequest
      }
    }) => {
      return {
        ingredients,
        selectedIngredient,
        ingredientsFailed,
        ingredientsRequest
      };
    }
  );

  const [orderNumber, setOrderNumber] = useState(null);
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setOrderDetailsModalOpen(false);
  }, []);

  const openIngredientDetailsModal = useCallback(
    ingredient => {
      dispatch({
        type: SELECT_INGREDIENT,
        payload: {
          ingredient: ingredient
        }
      });
    },
    [dispatch]
  );

  const closeIngredientDetailsModal = useCallback(() => {
    dispatch({
      type: UNSELECT_INGREDIENT
    });
  }, [dispatch]);

  const openOrderDetailsModal = () => {
    setOrderDetailsModalOpen(true);
    Api.sendOrder(ingredients.map(item => item._id)).then(({ order }) =>
      setOrderNumber(order.number)
    );
  };

  useEffect(() => {
    dispatch(getIngredientsApi());
  }, [dispatch]);

  return ingredientsRequest ? (
    <Loader />
  ) : (
    <>
      <AppHeader />
      {!ingredientsFailed ? (
        <main className={styles.main}>
          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients openModal={openIngredientDetailsModal} />
            <BurgerConstructor
              ingredientsData={ingredients}
              openModal={openOrderDetailsModal}
            />
          </IngredientsContext.Provider>
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
      {isOrderDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default App;
