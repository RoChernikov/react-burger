import styles from './ingredient-icon.module.scss';
import React, { FC } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngIcon } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const IngredientIcon: FC<IIngIcon> = ({ img, extra, count, isDiv }) => {
  return !isDiv ? (
    <li className={styles.ingredient}>
      <img className={styles.ingredient__image} src={img} alt="ингредиент" />
      {count && count > 1 && !extra && <Counter count={count} size="small" />}
      {extra && (
        <div
          className={`text text_type_main-default ${styles.ingredient__overlay}`}>{`+${extra}`}</div>
      )}
    </li>
  ) : (
    <div className={styles.ingredient} style={{ margin: '0' }}>
      <img className={styles.ingredient__image} src={img} alt="ингредиент" />
      {extra && (
        <div
          className={`text text_type_main-default ${styles.ingredient__overlay}`}>{`+${extra}`}</div>
      )}
    </div>
  );
};
export default IngredientIcon;
