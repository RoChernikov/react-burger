import { useState } from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from '../header-link/header-link';

const AppHeader = () => {
  const [page, setPage] = useState('constructor');

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mr-2">
            <HeaderLink
              icon="burger"
              active={page === 'constructor' ? true : false}
              onClick={() => setPage('constructor')}
            >
              Конструктор
            </HeaderLink>
          </li>
          <li>
            <HeaderLink
              icon="list"
              active={page === 'orderList' ? true : false}
              onClick={() => setPage('orderList')}
            >
              Лента заказов
            </HeaderLink>
          </li>
        </ul>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.profileLinkWrapper}>
          <HeaderLink
            icon="profile"
            active={page === 'profile' ? true : false}
            onClick={() => setPage('profile')}
          >
            Личный кабинет
          </HeaderLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
