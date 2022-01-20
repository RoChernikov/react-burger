import styles from './app-header.module.css';
import { useState } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './components/header-link';

const AppHeader = () => {
  const [page, setPage] = useState('constructor');

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className="mr-2">
            <HeaderLink
              icon={
                <BurgerIcon
                  type={page === 'constructor' ? 'primary' : 'secondary'}
                />
              }
              active={page === 'constructor' ? true : false}
              onClick={() => setPage('constructor')}>
              Конструктор
            </HeaderLink>
          </li>
          <li>
            <HeaderLink
              icon={
                <ListIcon
                  type={page === 'orderList' ? 'primary' : 'secondary'}
                />
              }
              active={page === 'orderList' ? true : false}
              onClick={() => setPage('orderList')}>
              Лента заказов
            </HeaderLink>
          </li>
        </ul>
        <a href="#" className={styles.logoWrapper}>
          <Logo />
        </a>
        <div className={styles.profileLinkWrapper}>
          <HeaderLink
            icon={
              <ProfileIcon
                type={page === 'profile' ? 'primary' : 'secondary'}
              />
            }
            active={page === 'profile' ? true : false}
            onClick={() => setPage('profile')}>
            Личный кабинет
          </HeaderLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
