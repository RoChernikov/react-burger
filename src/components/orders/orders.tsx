import styles from './orders.module.css';
import React, { FC } from 'react';
import OrderCard from './components/order-card/order-card';
import { IOrders } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const Orders: FC<IOrders> = ({ withStatus, path, orders }) => {
  return (
    <ul className={styles.orders}>
      {orders.map(order => (
        <OrderCard
          key={order._id}
          path={path}
          withStatus={withStatus}
          data={order}
        />
      ))}
    </ul>
  );
};

export default Orders;
