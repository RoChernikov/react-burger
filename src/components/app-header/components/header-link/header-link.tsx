import styles from './header-link.module.css';
import React, { FC } from 'react';
import { IHeaderLink } from '../../../../utils/interfaces';
import { NavLink } from 'react-router-dom';
//--------------------------------------------------------------------------------

const HeaderLink: FC<IHeaderLink> = ({ to, icon, children }) => {
  return (
    <NavLink
      exact
      to={to}
      className={`pl-5 pr-5 ${styles.link}`}
      activeClassName={styles.link_active}>
      {icon}
      <p className="text text_type_main-default ml-2">{children}</p>
    </NavLink>
  );
};

export default HeaderLink;
