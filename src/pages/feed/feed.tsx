import styles from './feed.module.css';
import React, { FC } from 'react';
//--------------------------------------------------------------------------------

const FeedPage: FC = () => {
  return (
    <div className={styles.box}>
      <h1>Лента заказов в разработке</h1>
    </div>
  );
};

export default FeedPage;
