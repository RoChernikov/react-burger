import styles from './ingredient.module.css';
import React, { FC } from 'react';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//--------------------------------------------------------------------------------

const Ingredient: FC = () => {
  return (
    <li className={styles.ingredient}>
      <IngredientIcon
        img="https://code.s3.yandex.net/react/code/bun-01-mobile.png"
        isDiv
      />
      <p className={`text text_type_main-default ml-4 mr-4 ${styles.title}`}>
        Флюоресцентная булка R2-D3
      </p>
      <p className={styles.price}>
        <span className="text text_type_digits-default mr-2">2 x 20</span>{' '}
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default Ingredient;
