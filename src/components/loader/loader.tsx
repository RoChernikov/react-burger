import styles from './loader.module.css';
import React, { FC } from 'react';
//--------------------------------------------------------------------------------

const Loader: FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
