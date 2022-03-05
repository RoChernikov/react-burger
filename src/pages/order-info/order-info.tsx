import styles from './order-info.module.css';
import React, { FC } from 'react';
import OrderInfo from '../../components/order-info/order-info';
//--------------------------------------------------------------------------------

const OrderInfoPage: FC = () => {
  return (
    <section className={styles.section}>
      <OrderInfo />
    </section>
  );
};

export default OrderInfoPage;
