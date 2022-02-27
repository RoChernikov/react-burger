import styles from './feed.module.css';
import React, { FC } from 'react';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
//--------------------------------------------------------------------------------

const FeedPage: FC = () => {
  return (
    <div className={styles.container}>
      <DeveloperGuy>Страница в разработке!</DeveloperGuy>
    </div>
  );
};

export default FeedPage;
