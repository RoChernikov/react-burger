import styles from './BurgerIngredient.module.css';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../../../utils/types';
//--------------------------------------------------------------------------------

const BurgerIngredient = forwardRef(
  ({ ingredient, openModal, isDragging }, ref) => {
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

    const counts = useMemo(() => {
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
      <li
        className={
          isDragging
            ? `${styles.ingredient} ${styles.dragging}`
            : `${styles.ingredient}`
        }
        onClick={() => openModal(ingredient)}
        ref={ref}>
        {counts[ingredient._id] > 0 ? (
          <Counter count={counts[ingredient._id]} size="default" />
        ) : null}
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="ml-4 mr-4"
        />
        <div className={`mt-2 mb-2 ${styles.priceContainer}`}>
          <p className="text text_type_digits-default pr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </li>
    );
  }
);

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  openModal: PropTypes.func.isRequired,
  isDragging: PropTypes.bool
};

export default BurgerIngredient;
