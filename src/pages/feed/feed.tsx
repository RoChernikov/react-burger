import styles from './feed.module.css';
import React, { FC } from 'react';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
//--------------------------------------------------------------------------------

const FeedPage: FC = () => {
  return (
    <div className={styles.box}>
      <DeveloperGuy />
    </div>
  );
};

export default FeedPage;
