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
  const [ingredients, setIngredients] = useState([]);
  const [pickedBunItem, setpickedBunItem] = useState({});
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] =
    useState(false);

  const closeModal = useCallback(() => {
    setOrderDetailsModalOpen(false);
    setIngredientDetailsModalOpen(false);
  }, [setOrderDetailsModalOpen, setIngredientDetailsModalOpen]);

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
      .catch(error => console.log(`Ошибка получения данных: ${error}`));
  }, []);

  return (
    <>
      <AppHeader />
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
