import styles from './header-link.module.css';
import React, { FC } from 'react';
import { IHeaderLink } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const HeaderLink: FC<IHeaderLink> = ({ icon, active, children, onClick }) => {
  return (
    <a
      href="/"
      className={
        active
          ? `pl-5 pr-5 ${styles.link} ${styles.link_active}`
          : `pl-5 pr-5 ${styles.link}`
      }
      onClick={onClick}>
      {icon}
      <p className="text text_type_main-default ml-2">{children}</p>
    </a>
  );
};

export default HeaderLink;
