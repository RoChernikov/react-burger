import styles from './orders.module.css';
import React, { FC } from 'react';
import OrderCard from './components/order-card/order-card';
//--------------------------------------------------------------------------------

const Orders: FC = () => {
  return (
    <ul className={styles.orders}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </ul>
  );
};

export default Orders;
