import styles from './app.module.css';
import { useEffect, useState, useCallback } from 'react';
import Api from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const App = () => {
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [pickedBunItem, setpickedBunItem] = useState({});
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] =
    useState(false);

  const closeModal = useCallback(() => {
    setOrderDetailsModalOpen(false);
    setIngredientDetailsModalOpen(false);
  }, []);

  const openOrderDetailsModal = () => {
    setOrderDetailsModalOpen(true);
  };

  const openIngredientDetailsModal = ingredient => {
    setIngredientDetailsModalOpen(true);
    setpickedBunItem(ingredient);
  };

  useEffect(() => {
    Api.getIngredients()
      .then(res => {
        setIngredients(res.data);
      })
      .catch(error => {
        setIsLoadingError(true);
        console.log(`Ошибка получения данных: ${error}`);
      });
  }, []);

  return (
    <>
      <AppHeader />
      {!isLoadingError ? (
        <main className={styles.main}>
          <BurgerIngredients
            ingredientsData={ingredients}
            openModal={openIngredientDetailsModal}
          />
          <BurgerConstructor
            ingredientsData={ingredients}
            openModal={openOrderDetailsModal}
          />
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
      {isOrderDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}

      {isIngredientDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={pickedBunItem} />
        </Modal>
      )}
    </>
  );
};

export default App;
