import styles from './nav-bar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
//--------------------------------------------------------------------------------

const NavBar = ({ handleSelect, selectedMeal }) => {
  return (
    <nav className={`mt-5 ${styles.navBar}`}>
      <Tab value="bun" active={selectedMeal === 'bun'} onClick={handleSelect}>
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={selectedMeal === 'sauce'}
        onClick={handleSelect}>
        Соусы
      </Tab>
      <Tab value="main" active={selectedMeal === 'main'} onClick={handleSelect}>
        Начинки
      </Tab>
    </nav>
  );
};

NavBar.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selectedMeal: PropTypes.string.isRequired
};

export default NavBar;
