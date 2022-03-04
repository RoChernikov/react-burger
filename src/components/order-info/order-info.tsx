import styles from './order-info.module.css';
import React, { FC } from 'react';
import Ingredient from './components/ingredient/ingredient';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//--------------------------------------------------------------------------------

const OrderInfo: FC = () => {
  return (
    <div className={styles.orderInfo}>
      <p className={`text text_type_digits-default mt-5 ${styles.id}`}>
        #034533
      </p>
      <h1 className="text text_type_main-medium mt-10">
        Black Hole Singularity острый бургер
      </h1>
      <p
        className="text text_type_main-default mt-2"
        style={{ color: '#00cccc' }}>
        Выполнен
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`custom-scroll mt-6 ${styles.list}`}>
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </ul>
      <div className={styles.footer}>
        <time className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </time>
        <div style={{ marginLeft: 'auto' }} className={styles.price}>
          <span className="text text_type_digits-default mr-2">510</span>{' '}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
