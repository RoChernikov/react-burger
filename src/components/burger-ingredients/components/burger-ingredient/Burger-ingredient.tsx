import styles from './BurgerIngredient.module.css';
import React, { forwardRef } from 'react';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerIngredient } from '../../../../utils/interfaces';
import { Link, useLocation } from 'react-router-dom';
//--------------------------------------------------------------------------------

const BurgerIngredient = forwardRef<
  HTMLLIElement,
  IBurgerIngredient & { isDragging: boolean }
>(({ ingredient, count, isDragging }, ref) => {
  const location = useLocation();
  return (
    <li ref={ref}>
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location }
        }}
        className={
          isDragging
            ? `${styles.ingredient} ${styles.dragging}`
            : `${styles.ingredient}`
        }>
        {count > 0 ? <Counter count={count} size="default" /> : null}
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
      </Link>
    </li>
  );
});

export default BurgerIngredient;
