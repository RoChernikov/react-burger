import styles from './app-header.module.css';
import React, { useState, FC } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './components/header-link/header-link';
import { NavLink } from 'react-router-dom';
//--------------------------------------------------------------------------------

const AppHeader: FC = () => {
  const [page, setPage] = useState('home');

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mr-2">
            <HeaderLink
              to="/"
              icon={
                <BurgerIcon type={page === 'home' ? 'primary' : 'secondary'} />
              }
              onClick={() => setPage('home')}>
              Конструктор
            </HeaderLink>
          </li>
          <li>
            <HeaderLink
              to="/feed"
              icon={
                <ListIcon
                  type={page === 'orderList' ? 'primary' : 'secondary'}
                />
              }
              onClick={() => setPage('orderList')}>
              Лента заказов
            </HeaderLink>
          </li>
        </ul>
        <NavLink
          to="/"
          className={styles.logoWrapper}
          onClick={() => setPage('home')}>
          <Logo />
        </NavLink>
        <div className={styles.profileLinkWrapper}>
          <HeaderLink
            to="/profile"
            icon={
              <ProfileIcon
                type={page === 'profile' ? 'primary' : 'secondary'}
              />
            }
            onClick={() => setPage('profile')}>
            Личный кабинет
          </HeaderLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
