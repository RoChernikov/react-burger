import styles from './order-card.module.css';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ILocationParams } from '../../../../utils/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import formatDate from '../../../../utils/format-date';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
//--------------------------------------------------------------------------------

const OrderCard: FC = () => {
  const location = useLocation<ILocationParams>();
  return (
    <li className={`p-6 ${styles.orderCard}`}>
      <Link
        to={{
          pathname: `feed/${'id'}`,
          state: { background: location }
        }}
        className={styles.link}>
        <p className={`text text_type_digits-default ${styles.header}`}>
          #{'034534'}{' '}
          <time className="text text_type_main-default text_color_inactive">
            {formatDate('2022-02-28T21:20:29.552Z')} i-GMT+3
          </time>
        </p>
        <h2 className={`text text_type_main-medium ${styles.title}`}>
          {'Interstellar бургер'}
        </h2>
        <div className={styles.priceInfo}>
          <ul className={styles.ingredientsList}>
            <IngredientIcon
              img="https://code.s3.yandex.net/react/code/cheese-mobile.png"
              extra={3}
            />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/sauce-03-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/core-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/meat-03-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/bun-01-mobile.png" />
          </ul>
          <p className={styles.priceWrapper}>
            <span className={`text text_type_digits-default ${styles.price}`}>
              {'560'}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
