import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/IngredientsCategory';
import { IngredientType } from '../../utils/types';

function BurgerIngredients({ ingredientsData, openModal }) {
  const bun = ingredientsData.filter(ingredient => ingredient.type === 'bun');
  const sauce = ingredientsData.filter(
    ingredient => ingredient.type === 'sauce'
  );
  const main = ingredientsData.filter(ingredient => ingredient.type === 'main');

  const [selectedMeal, setSelectedMeal] = useState('bun');

  const handleMealChange = evt => {
    setSelectedMeal(evt);
    document.getElementById(evt).scrollIntoView();
  };

  const inViewOptions = {
    threshold: 0.1,
    trackVisibility: true,
    delay: 100
  };

  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);

  useEffect(() => {
    if (inViewBun) {
      setSelectedMeal('bun');
    } else if (inViewSauce) {
      setSelectedMeal('sauce');
    } else if (inViewMain) {
      setSelectedMeal('main');
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  return (
    <section className={`mt-10 ml-5 ${styles.constructor}`}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        Соберите бургер
      </h1>
      <div className={`mt-5 ${styles.tab}`}>
        <Tab
          value="bun"
          active={selectedMeal === 'bun'}
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
        <IngredientsCategory
          id="bun"
          title="Булки"
          ingredients={bun}
          openModal={openModal}
          ref={bunRef}
        />
        <IngredientsCategory
          id="sauce"
          title="Соусы"
          ingredients={sauce}
          openModal={openModal}
          ref={sauceRef}
        />
        <IngredientsCategory
          id="main"
          title="Начинки"
          ingredients={main}
          openModal={openModal}
          ref={mainRef}
        />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
