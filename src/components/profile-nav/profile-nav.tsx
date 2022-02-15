import styles from './profile-nav.module.css';
import { NavLink } from 'react-router-dom';

const ProfileNav = () => {
  return (
    <aside className={styles.wrapper}>
      <ul className={styles.tabs}>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.link}`}
            activeClassName={styles.link_active}
            to="/profile">
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.link}`}
            activeClassName={styles.link_active}
            to="/profile/orders">
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            className={`text text_type_main-medium text_color_inactive pt-4 pb-5 ${styles.button}`}>
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`text text_type_main-default text_color_inactive mt-20 ${styles.hint}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileNav;
