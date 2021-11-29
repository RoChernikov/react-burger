import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients() {
  const [selectedMeal, setSelectedMeal] = useState('buns');
  const handleMealChange = evt => {
    setSelectedMeal(evt);
  };

  return (
    <section className={`mt-10 ml-5 ${styles.menu}`}>
      <p className={`text text_type_main-large ${styles.title}`}>
        Соберите бургер
      </p>
      <div className={`mt-5 ${styles.tab}`}>
        <Tab
          value="buns"
          active={selectedMeal === 'buns'}
          onClick={handleMealChange}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={selectedMeal === 'sauce'}
          onClick={handleMealChange}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={selectedMeal === 'main'}
          onClick={handleMealChange}
        >
          Начинки
        </Tab>
      </div>
    </section>
  );
}

export default BurgerIngredients;
