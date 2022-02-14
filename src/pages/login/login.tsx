import styles from './login.module.css';
import React, { FC } from 'react';
//--------------------------------------------------------------------------------

const LoginPage: FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoginPage;
