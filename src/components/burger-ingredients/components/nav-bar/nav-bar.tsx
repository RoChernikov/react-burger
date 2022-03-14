import styles from './nav-bar.module.scss';
import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import { IIngredientsNavBar } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const NavBar: FC<IIngredientsNavBar> = ({ handleSelect, selectedMeal }) => {
  const scrollProps = {
    smooth: 'easeInOutCubic',
    duration: 500,
    activeClass: 'active',
    containerId: 'scrollBox',
    isDynamic: false
  };
  return (
    <nav className={'mt-5'}>
      <ul className={styles.navBar}>
        <li>
          <Link to="bun" {...scrollProps}>
            <Tab
              value="bun"
              active={selectedMeal === 'bun'}
              onClick={handleSelect}>
              Булки
            </Tab>
          </Link>
        </li>
        <li>
          <Link to="sauce" {...scrollProps}>
            <Tab
              value="sauce"
              active={selectedMeal === 'sauce'}
              onClick={handleSelect}>
              Соусы
            </Tab>
          </Link>
        </li>
        <li>
          <Link to="main" {...scrollProps}>
            <Tab
              value="main"
              active={selectedMeal === 'main'}
              onClick={handleSelect}>
              Начинки
            </Tab>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
