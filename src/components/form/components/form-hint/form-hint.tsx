import styles from './form-hint.module.scss';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IFormHint } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const FormHint: FC<IFormHint> = ({ link, caption, children }) => {
  return (
    <p
      className={`text text_type_main-default text_color_inactive ${styles.hint}`}>
      {`${children} `}
      <Link to={link} className={`text text_type_main-default ${styles.link}`}>
        {caption}
      </Link>
    </p>
  );
};

export default FormHint;
