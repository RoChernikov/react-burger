import styles from './order-card.module.scss';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ILocationParams } from '../../../../utils/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import formatDate from '../../../../utils/format-date';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
import { useAppSelector } from '../../../../services/hooks';
import { IOrder } from '../../../../utils/interfaces';
import { getOrderDataByIds } from '../../../../services/slices/ingredients';
//--------------------------------------------------------------------------------

const OrderCard: FC<IOrder> = ({ withStatus, path, data }) => {
  const location = useLocation<ILocationParams>();
  const { ingredients, totalPrice } = useAppSelector(
    getOrderDataByIds(data.ingredients)
  );

  let status = '';
  switch (data.status) {
    case 'created':
      status = 'Создан';
      break;
    case 'pending':
      status = 'Готовится';
      break;
    case 'done':
      status = 'Выполнен';
      break;
  }

  if (!ingredients) {
    return null;
  }

  return (
    <li className={`p-6 ${styles.orderCard}`}>
      <Link
        to={{
          pathname: `${path}${data._id}`,
          state: { background: location }
        }}
        className={styles.orderCard__link}>
        <p
          className={`text text_type_digits-default ${styles.orderCard__header}`}>
          #{data.number}{' '}
          <time className="text text_type_main-default text_color_inactive">
            {formatDate(data.createdAt)} i-GMT+3
          </time>
        </p>
        <h2 className={`text text_type_main-medium mt-6 ${styles.title}`}>
          {data.name}
        </h2>
        {withStatus && (
          <p
            className={`text text_type_main-default mt-2 ${
              data.status === 'done' && styles.orderCard__subTitle
            }`}>
            {status}
          </p>
        )}
        <div className={styles.orderCard__priceInfo}>
          <ul className={styles.orderCard__ingredientsList}>
            {ingredients.length > 5 && (
              <IngredientIcon
                img={ingredients[ingredients.length - 6].image_mobile}
                extra={ingredients.length - 5}
              />
            )}
            {ingredients.slice(-5).map((ing, i) => {
              return <IngredientIcon img={ing.image} key={i} count={ing.qty} />;
            })}
          </ul>
          <p className={styles.orderCard__priceWrapper}>
            <span
              className={`text text_type_digits-default ${styles.orderCard__price}`}>
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
