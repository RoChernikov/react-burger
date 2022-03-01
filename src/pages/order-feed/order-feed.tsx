import styles from './order-feed.module.css';
import React, { FC } from 'react';
import Feed from '../../components/feed/feed';
import FeedStats from './components/feed-stats/feed-stats';
//--------------------------------------------------------------------------------

const OrderFeedPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1
        className={`text text_type_main-large mt-10 mb-5 ml-2 ${styles.title}`}>
        Лента заказов
      </h1>
      <Feed />
      <FeedStats />
    </main>
  );
};

export default OrderFeedPage;
