import styles from './ingredient-icon.module.css';
import React, { FC } from 'react';
import { IIngIcon } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const IngredientIcon: FC<IIngIcon> = ({ img, extra, isDiv = false }) => {
  return !isDiv ? (
    <li className={styles.ingredient}>
      <img className={styles.image} src={img} alt="ингредиент" />
      {extra && (
        <div
          className={`text text_type_main-default ${styles.overlay}`}>{`+${extra}`}</div>
      )}
    </li>
  ) : (
    <div className={styles.ingredient} style={{ margin: '0' }}>
      <img className={styles.image} src={img} alt="ингредиент" />
      {extra && (
        <div
          className={`text text_type_main-default ${styles.overlay}`}>{`+${extra}`}</div>
      )}
    </div>
  );
};
export default IngredientIcon;
