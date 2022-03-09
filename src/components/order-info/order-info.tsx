import styles from './order-info.module.css';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import Ingredient from './components/ingredient/ingredient';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectOrderById } from '../../services/slices/ws-orders';
import { getOrderDataByIds } from '../../services/slices/ingredients';
import formatDate from '../../utils/format-date';
import { IWsIngredient } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const OrderInfo: FC = () => {
  const params = useParams<{ id: string }>();
  const order = useAppSelector(selectOrderById(params.id));
  const { ingredients, totalPrice } = useAppSelector(
    getOrderDataByIds(order.ingredients)
  );

  let status = '';
  switch (order.status) {
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
  const hightlight = order.status === 'done' ? { color: '#00cccc' } : {};

  return (
    <div className={styles.orderInfo}>
      <p className="text text_type_digits-default mt-5">#{order.number}</p>
      <h1 className="text text_type_main-medium mt-10">{order.name}</h1>
      <p className="text text_type_main-default mt-2" style={hightlight}>
        {status}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`mt-6 ${styles.list}`}>
        {ingredients.map((ing: IWsIngredient, idx: number) => {
          return <Ingredient ingredient={ing} key={idx} />;
        })}
      </ul>
      <div className={styles.footer}>
        <time className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)} i-GMT+3
        </time>
        <div style={{ marginLeft: 'auto' }} className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {totalPrice}
          </span>{' '}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
