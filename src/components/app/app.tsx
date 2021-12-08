import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);

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
        <BurgerIngredients ingredientsData={ingredients} />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
