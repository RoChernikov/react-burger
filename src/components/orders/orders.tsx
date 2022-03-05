import styles from './orders.module.css';
import React, { FC } from 'react';
import OrderCard from './components/order-card/order-card';
import { IOrders } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const Orders: FC<IOrders> = ({ withStatus, path }) => {
  return (
    <ul className={styles.orders}>
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
      <OrderCard path={path} withStatus={withStatus} />
    </ul>
  );
};

export default Orders;
