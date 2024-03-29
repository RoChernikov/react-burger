import styles from './status-list.module.scss';
import React, { FC, useEffect } from 'react';
import { IStatusList } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const StatusList: FC<IStatusList> = ({ title, hightlight, orders }) => {
  const style = hightlight
    ? {
        color: '#00cccc'
      }
    : {};

  return (
    <div className={styles.status}>
      <p className={`text text_type_main-medium ${styles.status__title}`}>
        {title}
      </p>
      <ul className={`mt-6 ${styles.status__list}`}>
        {orders.slice(0, 10).map(order => {
          return (
            <li
              className={'text text_type_digits-default'}
              style={style}
              key={order}>
              {order}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatusList;
