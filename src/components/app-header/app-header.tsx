import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from '../header-link/header-link';

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mr-2">
            <HeaderLink icon="burger">Конструктор</HeaderLink>
          </li>
          <li>
            <HeaderLink icon="list">Лента заказов</HeaderLink>
          </li>
        </ul>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.profileLinkWrapper}>
          <HeaderLink icon="profile">Личный кабинет</HeaderLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
