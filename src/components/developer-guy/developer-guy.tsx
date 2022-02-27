import styles from './developer-guy.module.css';
import React, { FC } from 'react';
import img from '../../images/Developer.png';
//--------------------------------------------------------------------------------

const DeveloperGuy: FC<{ children: string }> = ({ children }) => {
  const bgImage = { backgroundImage: `url(${img})` };
  return (
    <div className={styles.container}>
      <div className={styles.developer}>
        <div className={styles.chair} style={bgImage}></div>
        <div className={styles.leftshoe} style={bgImage}></div>
        <div className={styles.rightshoe} style={bgImage}></div>
        <div className={styles.legs} style={bgImage}></div>
        <div className={styles.torso}>
          <div className={styles.devBody} style={bgImage}></div>
          <div className={styles.leftarm} style={bgImage}></div>
          <div className={styles.rightarm} style={bgImage}></div>
          <div className={styles.devHead}>
            <div className={styles.eyes} style={bgImage}></div>
            <div className={styles.headImg} style={bgImage}></div>
          </div>
        </div>
        <div className={styles.laptop} style={bgImage}></div>
      </div>
      <p className={styles.speech}>{children}</p>
    </div>
  );
};

export default DeveloperGuy;
