import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/IngredientsCategory';
import { IngredientType } from '../../utils/types';

function BurgerIngredients({ ingredientsData }) {
  const buns = ingredientsData.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredientsData.filter(
    ingredient => ingredient.type === 'sauce'
  );
  const mains = ingredientsData.filter(
    ingredient => ingredient.type === 'main'
  );
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
      <ul className={` ${styles.ingredients}`}>
        <IngredientsCategory title="Булки" ingredients={buns} />
        <IngredientsCategory title="Соусы" ingredients={sauces} />
        <IngredientsCategory title="Начинки" ingredients={mains} />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired)
    .isRequired
};

export default BurgerIngredients;
