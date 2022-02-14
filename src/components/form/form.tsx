import React, { FC } from 'react';
import styles from './form.module.css';
import { IForm } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const Form: FC<IForm> = ({ children, onSubmit, title }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className={`text text_type_main-medium mb-6 ${styles.title}`}>
        {title}
      </p>
      {children}
    </form>
  );
};

export default Form;
