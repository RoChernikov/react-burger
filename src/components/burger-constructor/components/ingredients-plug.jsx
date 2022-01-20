import styles from './ingredients-plug.module.css';
import PropTypes from 'prop-types';

const IngredientsPlug = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

IngredientsPlug.propTypes = { children: PropTypes.string };

export default IngredientsPlug;
