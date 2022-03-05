import styles from './order-feed.module.css';
import React, { FC } from 'react';
import FeedStats from './components/feed-stats/feed-stats';
import Orders from '../../components/orders/orders';
//--------------------------------------------------------------------------------

const OrderFeedPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1
        className={`text text_type_main-large mt-10 mb-5 ml-2 ${styles.title}`}>
        Лента заказов
      </h1>
      <section className={styles.ordersSection}>
        <Orders path="feed/" />
      </section>
      <section className={styles.statsSection}>
        <FeedStats />
      </section>
    </main>
  );
};

export default OrderFeedPage;
