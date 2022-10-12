import styles from './not-found-404.module.css';
import React, { FC, useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
//--------------------------------------------------------------------------------

const NotFound404: FC = () => {
  const history = useHistory();

  const goHome = useCallback(() => {
    history.replace({ pathname: '/' });
  }, [history]);

  return (
    <main className={styles.main}>
      <div className={styles.topHeader}></div>
      <div>
        <div className={styles.starsec}></div>
        <div className={styles.starthird}></div>
        <div className={styles.starfourth}></div>
        <div className={styles.starfifth}></div>
      </div>

      <div className={styles.lampWrap}>
        <div className={styles.lamp}>
          <div className={styles.cable}></div>
          <div className={styles.cover}></div>
          <div className={styles.inCover}>
            <div className={styles.bulb}></div>
          </div>
          <div className={styles.light}></div>
        </div>
      </div>

      <section className={styles.error}>
        <div className={styles.errorContent}>
          <div className={`${styles.errorMessage} ${styles.message}`}>
            <h1 className={styles.messageTitle}>Страница не найдена :(</h1>
            <p className={styles.messageText}>404</p>
          </div>
          <div className={`${styles.errorNav} ${styles.eNav}`}>
            <Button onClick={goHome} htmlType={'button'}>Вернуться на главную</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound404;
