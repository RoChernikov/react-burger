import styles from './orders.module.scss';
import React, { FC } from 'react';
import OrderCard from './components/order-card/order-card';
import { IOrders } from '../../utils/interfaces';
import Loader from '../loader/loader';
//--------------------------------------------------------------------------------

const Orders: FC<IOrders> = ({ withStatus, path, orders }) => {
  return !orders ? (
    <Loader />
  ) : (
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
