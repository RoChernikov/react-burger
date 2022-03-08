import styles from './order-card.module.css';
import React, { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ILocationParams } from '../../../../utils/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import formatDate from '../../../../utils/format-date';
import IngredientIcon from '../../../ingredient-icon/ingredient-icon';
import { useAppSelector } from '../../../../services/hooks';
import { IOrder } from '../../../../utils/interfaces';
import {
  getIconsByIds,
  calcPriceByIds
} from '../../../../services/slices/ingredients';
//--------------------------------------------------------------------------------

const OrderCard: FC<IOrder> = ({ withStatus, path, data }) => {
  const location = useLocation<ILocationParams>();
  const icons = useAppSelector(getIconsByIds(data.ingredients));
  const totalPrice = useAppSelector(calcPriceByIds(data.ingredients));

  useEffect(() => {
    console.log([...data.ingredients].reverse());
  }, []);

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
          <p className={`text text_type_main-default mt-2 ${styles.subTitle}`}>
            {data.status}
          </p>
        )}
        <div className={styles.priceInfo}>
          <ul className={styles.ingredientsList}>
            {icons.map((icon, i) => (
              <IngredientIcon img={icon} key={i} />
            ))}
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
