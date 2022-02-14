import React, { FC } from 'react';
import styles from './input-wrapper.module.css';
import { IInputWrapper } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const InputWrapper: FC<IInputWrapper> = ({ children }) => {
  return <div className={`mb-6 ${styles.wrapper}`}>{children}</div>;
};

export default InputWrapper;
