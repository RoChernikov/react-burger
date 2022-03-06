import styles from './status-list.module.css';
import React, { FC } from 'react';
import { IStatusList } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const StatusList: FC<IStatusList> = ({ title, hightlight }) => {
  const style = hightlight
    ? {
        color: '#00cccc'
      }
    : {};

  return (
    <div className={styles.status}>
      <p className={`text text_type_main-medium ${styles.title}`}>{title}</p>
      <ul className={`mt-6 ${styles.list}`}>
        <li className={'text text_type_digits-default'} style={style}>
          034533
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034532
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034530
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034527
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034525
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034533
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034532
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034530
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034527
        </li>
        <li className={'text text_type_digits-default'} style={style}>
          034525
        </li>
      </ul>
    </div>
  );
};

export default StatusList;
