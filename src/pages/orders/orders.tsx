import styles from './orders.module.css';
import React, { FC } from 'react';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
//--------------------------------------------------------------------------------

const OrdersPage: FC = () => {
  return (
    <div className={styles.container}>
      <DeveloperGuy>Страница в разработке!</DeveloperGuy>
    </div>
  );
};

export default OrdersPage;
