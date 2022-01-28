import styles from './burger-ingredients.module.css';
import { useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import NavBar from './components/nav-bar/nav-bar';
import IngredientsCategory from './components/ingredients-category/IngredientsCategory';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeal } from '../../services/actions/ingredients';
//--------------------------------------------------------------------------------

function BurgerIngredients({ openModal }) {
  const dispatch = useDispatch();

  const { ingredients, selectedIngredients, selectedBun, selectedMeal } =
    useSelector(
      ({
        ingredients: { ingredients, selectedMeal },
        burgerConstructor: { selectedIngredients, selectedBun }
      }) => {
        return {
          ingredients,
          selectedIngredients,
          selectedBun,
          selectedMeal
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
      <ul className={` ${styles.ingredients}`} id="scrollBox">
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
