import styles from './order-info.module.css';
import React, { FC, useEffect } from 'react';
import { wsInit, wsClose } from '../../services/slices/ws-orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';
import Loader from '../../components/loader/loader';
import Message from '../../components/message/message';
//--------------------------------------------------------------------------------

const OrderInfoPage: FC = () => {
  const { wsRequest, wsFailed, wsOpen, orders } = useAppSelector(
    state => state.wsOrders
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsInit());

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return orders.length === 0 && !wsFailed ? (
    <Loader />
  ) : (
    <>
      {wsFailed ? (
        <Message>Не удалось загрузить данные!</Message>
      ) : (
        <section className={styles.section}>
          <OrderInfo />
        </section>
      )}
    </>
  );
};

export default OrderInfoPage;
