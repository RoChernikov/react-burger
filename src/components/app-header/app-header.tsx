import styles from './app-header.module.css';
import React, { useState, FC, useMemo } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './components/header-link/header-link';
import { NavLink, useHistory } from 'react-router-dom';
//--------------------------------------------------------------------------------

const AppHeader: FC = () => {
  const history = useHistory();
  const path = useMemo(() => history.location.pathname, [history.location]);

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mr-2">
            <HeaderLink
              to="/"
              icon={
                <BurgerIcon type={path === '/' ? 'primary' : 'secondary'} />
              }>
              Конструктор
            </HeaderLink>
          </li>
          <li>
            <HeaderLink
              to="/feed"
              icon={
                <ListIcon type={path === '/feed' ? 'primary' : 'secondary'} />
              }>
              Лента заказов
            </HeaderLink>
          </li>
        </ul>
        <NavLink to="/" className={styles.logoWrapper}>
          <Logo />
        </NavLink>
        <div className={styles.profileLinkWrapper}>
          <HeaderLink
            to="/profile"
            icon={
              <ProfileIcon
                type={path === '/profile' ? 'primary' : 'secondary'}
              />
            }>
            Личный кабинет
          </HeaderLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
