import styles from './order-history.module.scss';
import React, { FC, useEffect } from 'react';
import ProfileNav from '../../components/profile-nav/profile-nav';
import Orders from '../../components/orders/orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { wsInit, wsClose } from '../../services/slices/ws-orders';
//--------------------------------------------------------------------------------

const OrderHistoryPage: FC = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector(state => state.wsOrders);

  useEffect(() => {
    dispatch(wsInit());

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);
  return (
    <main className={styles.content}>
      <ProfileNav />
      <section className={styles.content__section}>
        <Orders path="profile/orders/" withStatus orders={orders} />
      </section>
    </main>
  );
};

export default OrderHistoryPage;
