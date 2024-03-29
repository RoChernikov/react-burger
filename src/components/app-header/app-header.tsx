import styles from './app-header.module.scss';
import React, { FC, useMemo, useEffect } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './components/header-link/header-link';
import { NavLink, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { getUser } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const path = useMemo(() => history.location.pathname, [history.location]);
  const { user, isAuth, status } = useAppSelector(state => state.user);

  useEffect(() => {
    isAuth && dispatch(getUser());
  }, [dispatch, isAuth]);

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__list}>
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
        <NavLink to="/" className={styles.header__logoWrapper}>
          <Logo />
        </NavLink>
        <div
          className={
            isAuth && status !== 'pending'
              ? `${styles.header__profileLinkWrapper} ${styles.loggedIn}`
              : `${styles.header__profileLinkWrapper}`
          }>
          <HeaderLink
            to="/profile"
            icon={
              <ProfileIcon
                type={path === '/profile' ? 'primary' : 'secondary'}
              />
            }>
            {isAuth ? `${user?.name}` : 'Личный кабинет'}
          </HeaderLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
