import React, { useCallback } from 'react';
import styles from './profile-nav.module.scss';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { signOut } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const ProfileNav = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  //-------------------------------------------------------------------------------

  const handleLogoutClick = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(
        signOut(() => {
          history.replace({ pathname: '/login' });
        })
      );
    },
    [dispatch, history]
  );

  return (
    <aside className={styles.wrapper}>
      <ul className={styles.wrapper__tabs}>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.wrapper__link}`}
            activeClassName={styles.wrapper__link_active}
            exact
            to="/profile">
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.wrapper__link}`}
            activeClassName={styles.wrapper__link_active}
            exact
            to="/profile/orders">
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogoutClick}
            className={`text text_type_main-medium text_color_inactive pt-4 pb-5 ${styles.wrapper__button}`}>
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`text text_type_main-default text_color_inactive mt-20 ${styles.wrapper__hint}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileNav;
