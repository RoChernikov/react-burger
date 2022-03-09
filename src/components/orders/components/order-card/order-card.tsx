import styles from './order-card.module.css';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ILocationParams } from '../../../../utils/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import formatDate from '../../../../utils/format-date';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
import { useAppSelector } from '../../../../services/hooks';
import { IOrder } from '../../../../utils/interfaces';
import { getOrderData } from '../../../../services/slices/ingredients';
//--------------------------------------------------------------------------------

const OrderCard: FC<IOrder> = ({ withStatus, path, data }) => {
  const location = useLocation<ILocationParams>();
  // const totalPrice = useAppSelector(calcPriceByIds(data.ingredients));
  const { bunIcon, restIngIcons, totalPrice } = useAppSelector(
    getOrderData(data.ingredients)
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

  return (
    <li className={`p-6 ${styles.orderCard}`}>
      <Link
        to={{
          pathname: `${path}${data._id}`,
          state: { background: location }
        }}
        className={styles.link}>
        <p className={`text text_type_digits-default ${styles.header}`}>
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
              data.status === 'done' && styles.subTitle
            }`}>
            {status}
          </p>
        )}
        <div className={styles.priceInfo}>
          <ul className={styles.ingredientsList}>
            {restIngIcons.length > 4 && (
              <IngredientIcon
                img={restIngIcons[4]}
                extra={restIngIcons.length - 4}
              />
            )}
            {restIngIcons
              .reverse()
              .slice(-4)
              .map((icon, i) => (
                <IngredientIcon img={icon} key={i} />
              ))}
            <IngredientIcon img={bunIcon} />
          </ul>
          <p className={styles.priceWrapper}>
            <span className={`text text_type_digits-default ${styles.price}`}>
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
