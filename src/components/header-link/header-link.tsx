import React from 'react';
import styles from './header-link.module.css';
import PropTypes from 'prop-types';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

interface HeaderLinkProps {
  icon: 'burger' | 'list' | 'profile';
  children: string;
}

function HeaderLink({ icon, children }: HeaderLinkProps) {
  const IconComponent =
    icon == 'burger' ? (
      <BurgerIcon type="primary" /> //в будещем type будет меняться динамически
    ) : icon == 'list' ? (
      <ListIcon type="primary" />
    ) : (
      <ProfileIcon type="primary" />
    );
  return (
    <a className={`pl-5 pr-5 ${styles.link}`}>
      {IconComponent}
      <p className="text text_type_main-default ml-2">{children}</p>
    </a>
  );
}

export default HeaderLink;
