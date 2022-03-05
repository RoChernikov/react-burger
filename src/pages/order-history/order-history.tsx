import styles from './order-history.module.css';
import React, { FC } from 'react';
import ProfileNav from '../../components/profile-nav/profile-nav';
import Orders from '../../components/orders/orders';
//--------------------------------------------------------------------------------

const OrderHistoryPage: FC = () => {
  return (
    <main className={styles.main}>
      <ProfileNav />
      <section className={styles.section}>
        <Orders path="profile/orders/" withStatus />
      </section>
    </main>
  );
};

export default OrderHistoryPage;
