import styles from './ingredients-plug.module.scss';
import React, { FC } from 'react';
import { IIngredientsPlug } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const IngredientsPlug: FC<IIngredientsPlug> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default IngredientsPlug;
