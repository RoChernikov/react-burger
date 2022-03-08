import styles from './order-feed.module.css';
import React, { FC, useEffect } from 'react';
import FeedStats from './components/feed-stats/feed-stats';
import Orders from '../../components/orders/orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { wsInit, wsClose } from '../../services/slices/ws-orders';
import Loader from '../../components/loader/loader';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
//--------------------------------------------------------------------------------

const OrderFeedPage: FC = () => {
  const dispatch = useAppDispatch();

  const { wsRequest, wsFailed, orders } = useAppSelector(
    state => state.wsOrders
  );

  useEffect(() => {
    dispatch(wsInit());

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return wsRequest ? (
    <Loader />
  ) : (
    <>
      {!wsFailed ? (
        <main className={styles.main}>
          <h1
            className={`text text_type_main-large mt-10 mb-5 ml-2 ${styles.title}`}>
            Лента заказов
          </h1>
          <section className={styles.ordersSection}>
            <Orders path="feed/" orders={orders} />
          </section>
          <section className={styles.statsSection}>
            <FeedStats />
          </section>
        </main>
      ) : (
        <main className={styles.errorMain}>
          <DeveloperGuy>Не удалось загрузить данные!</DeveloperGuy>
        </main>
      )}
    </>
  );
};

export default OrderFeedPage;
