import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/IngredientsCategory';
import { data } from '../../utils/data';

function BurgerIngredients() {
  const [selectedMeal, setSelectedMeal] = useState('buns');
  const handleMealChange = evt => {
    setSelectedMeal(evt);
  };

  return (
    <section className={`mt-10 ml-5 ${styles.constructor}`}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        Соберите бургер
      </h1>
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
      <div className={` ${styles.ingredients}`}>
        <IngredientsCategory
          title="Булки"
          ingredients={data.filter(item => item.type === 'bun')}
        />
        <IngredientsCategory
          title="Соусы"
          ingredients={data.filter(item => item.type === 'sauce')}
        />
        <IngredientsCategory
          title="Начинки"
          ingredients={data.filter(item => item.type === 'main')}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
