import styles from './order-details.module.css';
import React, { FC } from 'react';
//--------------------------------------------------------------------------------

const OrderDetails: FC<{ orderNumber: number }> = ({ orderNumber }) => {
  return (
    <div className={styles.orderDetails}>
      <h2 className={`text text_type_digits-large mt-20 ${styles.title}`}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`mt-15 ${styles.icon}`} />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
