import styles from './total-stat.module.scss';
import React, { FC } from 'react';
//--------------------------------------------------------------------------------

const TotalStat: FC<{ title: string; children: string | number }> = ({
  title,
  children
}) => {
  return (
    <div className={styles.totalStat}>
      <p className="text text_type_main-medium">{title}</p>
      <span className={`text text_type_digits-large ${styles.stat}`}>
        {!children ? '–' : children}
      </span>
    </div>
  );
};

export default TotalStat;
