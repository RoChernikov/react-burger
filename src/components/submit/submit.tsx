import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './submit.module.css';
import { ISubmit } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const Submit: FC<ISubmit> = ({ children, disabled, onClick, wrapStyles }) => {
  return (
    <div className={styles.wrapper} style={wrapStyles}>
      <Button
        type="primary"
        size="medium"
        disabled={disabled}
        onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default Submit;
