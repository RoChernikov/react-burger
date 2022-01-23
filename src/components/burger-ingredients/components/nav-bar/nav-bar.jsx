import styles from './nav-bar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import PropTypes from 'prop-types';
//--------------------------------------------------------------------------------

const NavBar = ({ handleSelect, selectedMeal }) => {
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

NavBar.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selectedMeal: PropTypes.string.isRequired
};

export default NavBar;
