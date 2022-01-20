import styles from './burger-ingredients.module.css';
import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './components/IngredientsCategory';
import { useSelector } from 'react-redux';

const inViewOptions = {
  threshold: 0.1,
  trackVisibility: true,
  delay: 100
};

function BurgerIngredients({ openModal }) {
  const ingredientsData = useSelector(state => state.ingredients.ingredients);
  const bun = useMemo(
    () => ingredientsData.filter(ingredient => ingredient.type === 'bun'),
    [ingredientsData]
  );
  const sauce = useMemo(
    () => ingredientsData.filter(ingredient => ingredient.type === 'sauce'),
    [ingredientsData]
  );
  const main = useMemo(
    () => ingredientsData.filter(ingredient => ingredient.type === 'main'),
    [ingredientsData]
  );

  const [selectedMeal, setSelectedMeal] = useState('bun');

  const handleMealChange = evt => {
    setSelectedMeal(evt);
    document.getElementById(evt).scrollIntoView();
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
          onClick={handleMealChange}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={selectedMeal === 'sauce'}
          onClick={handleMealChange}>
          Соусы
        </Tab>
        <Tab
          value="main"
          active={selectedMeal === 'main'}
          onClick={handleMealChange}>
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
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
