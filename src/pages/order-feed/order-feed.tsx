import styles from './order-feed.module.scss';
import React, { FC, useEffect } from 'react';
import FeedStats from './components/feed-stats/feed-stats';
import Orders from '../../components/orders/orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { wsInit, wsClose } from '../../services/slices/ws-orders';
import Loader from '../../components/loader/loader';
import Message from '../../components/message/message';
//--------------------------------------------------------------------------------

const OrderFeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const { wsRequest, wsFailed, orders, total, totalToday } = useAppSelector(
    state => state.wsOrders
  );
  const { ingredientsFailed, ingredientsRequest } = useAppSelector(
    state => state.ingredients
  );

  const pendingOrders = orders
    .filter(order => order.status === 'pending')
    .map(order => order.number);
  const doneOrders = orders
    .filter(order => order.status === 'done')
    .map(order => order.number);

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
      {!wsFailed && !ingredientsFailed && orders.length > 0 ? (
        <main className={styles.content}>
          <h1
            className={`text text_type_main-large mt-10 mb-5 ml-2 ${styles.content__title}`}>
            Лента заказов
          </h1>
          {orders.length === 50 ? (
            <section className={styles.content__ordersSection}>
              <Orders path="feed/" orders={orders} />
            </section>
          ) : (
            <Loader />
          )}
          <section className={styles.content__statsSection}>
            <FeedStats
              total={total}
              totalToday={totalToday}
              doneOrders={doneOrders}
              pendingOrders={pendingOrders}
            />
          </section>
        </main>
      ) : (
        <Message>Не удалось загрузить данные!</Message>
      )}
    </>
  );
};

export default OrderFeedPage;
