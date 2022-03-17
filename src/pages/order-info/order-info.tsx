import styles from './order-info.module.scss';
import React, { FC, useEffect } from 'react';
import {
  wsInit,
  wsInitWithCustomUrl,
  wsClose
} from '../../services/slices/ws-orders';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';
import Loader from '../../components/loader/loader';
import Message from '../../components/message/message';
import { getCookie } from '../../utils/cookie';
//--------------------------------------------------------------------------------

const OrderInfoPage: FC<{ pty?: boolean }> = ({ pty }) => {
  const { wsFailed, orders } = useAppSelector(state => state.wsOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    pty
      ? dispatch(
          wsInitWithCustomUrl(
            `wss://norma.nomoreparties.space/orders?token=${getCookie(
              'accessToken'
            )}`
          )
        )
      : dispatch(wsInit());

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, pty]);

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
