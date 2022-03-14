import styles from './message.module.scss';
import React, { FC } from 'react';
import DeveloperGuy from '../developer-guy/developer-guy';
//--------------------------------------------------------------------------------

const Message: FC<{ children: string }> = ({ children }) => {
  return (
    <main className={styles.main}>
      <DeveloperGuy>{children}</DeveloperGuy>
    </main>
  );
};

export default Message;
