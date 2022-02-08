import styles from './BurgerIngredient.module.css';
import React, { forwardRef } from 'react';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerIngredient } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const BurgerIngredient = forwardRef<
  HTMLLIElement,
  IBurgerIngredient & { isDragging: boolean }
>(({ ingredient, openModal, count, isDragging }, ref) => (
  <li
    className={
      isDragging
        ? `${styles.ingredient} ${styles.dragging}`
        : `${styles.ingredient}`
    }
    onClick={() => openModal(ingredient)}
    ref={ref}>
    {count > 0 ? <Counter count={count} size="default" /> : null}
    <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
    <div className={`mt-2 mb-2 ${styles.priceContainer}`}>
      <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
      <CurrencyIcon type="primary" />
    </div>
    <p className="text text_type_main-default">{ingredient.name}</p>
  </li>
));

export default BurgerIngredient;
