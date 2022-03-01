import styles from './orders.module.css';
import React, { FC } from 'react';
import OrderCard from './components/order-card/order-card';
//--------------------------------------------------------------------------------

const Orders: FC<{ withStatus?: boolean }> = ({ withStatus }) => {
  return (
    <ul className={styles.orders}>
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
      <OrderCard withStatus={withStatus} />
    </ul>
  );
};

export default Orders;
