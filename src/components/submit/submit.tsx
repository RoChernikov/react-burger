import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './submit.module.scss';
import { ISubmit } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const Submit: FC<ISubmit> = ({
  children,
  disabled,
  onClick,
  wrapStyles,
  type = 'primary',
  size = 'medium'
}) => {
  return (
    <div
      className={
        !disabled
          ? `${styles.wrapper}`
          : `${styles.wrapper} ${styles.btnDisable}`
      }
      style={wrapStyles}>
      <Button type={type} size={size} onClick={onClick} htmlType={'submit'}>
        {children}
      </Button>
    </div>
  );
};

export default Submit;
