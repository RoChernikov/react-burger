import { useEffect, useState, useCallback } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from '../../utils/api';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});
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
    setSelectedIngredient(ingredient);
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
        <BurgerConstructor openModal={openOrderDetailsModal} />
      </main>
      {isOrderDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}

      {isIngredientDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default App;
