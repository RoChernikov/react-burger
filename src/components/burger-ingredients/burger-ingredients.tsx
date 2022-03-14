// import styles from './';
import styles from './burger-ingredients.module.scss';
import React, { FC, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import NavBar from './components/nav-bar/nav-bar';
import IngredientsCategory from './components/ingredients-category/IngredientsCategory';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { selectMeal } from '../../services/slices/ingredients';
//--------------------------------------------------------------------------------

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();

  const { selectedIngredients, selectedBun } = useAppSelector(
    state => state.burgerConstructor
  );

  const { ingredients, selectedMeal } = useAppSelector(
    state => state.ingredients
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

  const handleMealChange = useCallback(
    evt => {
      dispatch(selectMeal(evt));
    },
    [dispatch]
  );

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
      dispatch(selectMeal('bun'));
    } else if (inViewSauce) {
      dispatch(selectMeal('sauce'));
    } else if (inViewMain) {
      dispatch(selectMeal('main'));
    }
  }, [dispatch, inViewBun, inViewMain, inViewSauce]);

  return (
    <section className={`mt-10 ml-5 ${styles.constructor}`}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        Соберите бургер
      </h1>
      <NavBar handleSelect={handleMealChange} selectedMeal={selectedMeal} />
      <ul className={` ${styles.constructor__ingredients}`} id="scrollBox">
        <IngredientsCategory
          id="bun"
          title="Булки"
          ingredients={bun}
          counts={counter}
          ref={bunRef}
        />
        <IngredientsCategory
          id="sauce"
          title="Соусы"
          ingredients={sauce}
          counts={counter}
          ref={sauceRef}
        />
        <IngredientsCategory
          id="main"
          title="Начинки"
          ingredients={main}
          counts={counter}
          ref={mainRef}
        />
      </ul>
    </section>
  );
};

export default BurgerIngredients;
