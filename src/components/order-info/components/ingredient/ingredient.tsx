import styles from './ingredient.module.scss';
import React, { FC } from 'react';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TWsIngredient } from '../../../../utils/types';
//--------------------------------------------------------------------------------

const Ingredient: FC<{ ingredient: TWsIngredient }> = ({ ingredient }) => {
  return (
    <li className={styles.ingredient}>
      <IngredientIcon img={ingredient.image_mobile} isDiv />
      <p
        className={`text text_type_main-default ml-4 mr-4 ${styles.ingredient__title}`}>
        {ingredient.name}
      </p>
      <p className={styles.ingredient__price}>
        <span className="text text_type_digits-default mr-2">
          {ingredient.qty} x {ingredient.price}
        </span>{' '}
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default Ingredient;
