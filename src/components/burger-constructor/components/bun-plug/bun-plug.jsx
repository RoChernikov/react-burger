import styles from './bun-plug.module.css';
import PropTypes from 'prop-types';
//--------------------------------------------------------------------------------

const BunPlug = ({ children, position }) => {
  return (
    <div
      className={
        position === 'top'
          ? `${styles.plug} ${styles.plug_pos_top}`
          : position === 'bottom'
          ? `${styles.plug} ${styles.plug_pos_bottom}`
          : `${styles.plug}`
      }>
      {children}
    </div>
  );
};

BunPlug.propTypes = {
  position: PropTypes.string,
  children: PropTypes.string
};

export default BunPlug;
