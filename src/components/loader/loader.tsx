import styles from './loader.module.css';
import React, { FC } from 'react';
import logo from '../../images/logo.png';
//--------------------------------------------------------------------------------

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <img src={logo} alt="" title="" className={styles.spinner} />
    </div>
  );
};

export default Loader;
