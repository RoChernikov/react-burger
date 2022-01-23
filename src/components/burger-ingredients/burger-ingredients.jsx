import styles from './burger-ingredients.module.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from './components/ingredients-category/IngredientsCategory';
import { useSelector } from 'react-redux';
//--------------------------------------------------------------------------------

const inViewOptions = {
  threshold: 0.1,
  trackVisibility: true,
  delay: 100
};

function BurgerIngredients({ openModal }) {
  const { ingredients, selectedIngredients, selectedBun } = useSelector(
    ({
      ingredients: { ingredients },
      burgerConstructor: { selectedIngredients, selectedBun }
    }) => {
      return {
        ingredients,
        selectedIngredients,
        selectedBun
      };
    }
  );
  const bun = useMemo(
    () => ingredients.filter(ingredient => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter(ingredient => ingredient.type === 'sauce'),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter(ingredient => ingredient.type === 'main'),
    [ingredients]
  );

  const [selectedMeal, setSelectedMeal] = useState('bun');

  const handleMealChange = useCallback(
    evt => {
      setSelectedMeal(evt);
      document.getElementById(evt).scrollIntoView();
    },
    [setSelectedMeal]
  );

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

  const counter = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => {
      if (ingredient.type === 'bun') {
        return {
          ...acc,
          [ingredient._id]:
            selectedBun && ingredient._id === selectedBun._id ? 1 : 0
        };
      }
      return {
        ...acc,
        [ingredient._id]: selectedIngredients.filter(
          selectedIngredient => selectedIngredient._id === ingredient._id
        ).length
      };
    }, {});
  }, [ingredients, selectedIngredients, selectedBun]);

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
          counts={counter}
          ref={bunRef}
        />
        <IngredientsCategory
          id="sauce"
          title="Соусы"
          ingredients={sauce}
          openModal={openModal}
          counts={counter}
          ref={sauceRef}
        />
        <IngredientsCategory
          id="main"
          title="Начинки"
          ingredients={main}
          openModal={openModal}
          counts={counter}
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
