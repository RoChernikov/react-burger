import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import styles from './submit.module.css';
import { ISubmit } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const Submit: FC<ISubmit> = ({ children }) => {
  return (
    <div className={`mb-20 ${styles.wrapper}`}>
      <Button type="primary" size="medium">
        {children}
      </Button>
    </div>
  );
};

export default Submit;
