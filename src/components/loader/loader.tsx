import styles from './loader.module.scss';
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
