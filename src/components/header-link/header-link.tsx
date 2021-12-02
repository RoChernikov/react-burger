import styles from './header-link.module.css';
import { useState } from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

interface HeaderLinkProps {
  icon: 'burger' | 'list' | 'profile';
  active: boolean;
  children: string;
  onClick: () => void;
}

function HeaderLink({ icon, active, children, onClick }: HeaderLinkProps) {
  const [iconState, setIconState] = useState(false);
  const IconComponent =
    icon === 'burger' ? (
      <BurgerIcon type={active || iconState ? 'primary' : 'secondary'} />
    ) : icon === 'list' ? (
      <ListIcon type={active || iconState ? 'primary' : 'secondary'} />
    ) : (
      <ProfileIcon type={active || iconState ? 'primary' : 'secondary'} />
    );

  return (
    <button
      className={
        active
          ? `pl-5 pr-5 ${styles.link} ${styles.link_active}`
          : `pl-5 pr-5 ${styles.link}`
      }
      onClick={onClick}
      onMouseEnter={() => setIconState(true)}
      onMouseLeave={() => setIconState(false)}
    >
      {IconComponent}
      <p className="text text_type_main-default ml-2">{children}</p>
    </button>
  );
}

export default HeaderLink;
