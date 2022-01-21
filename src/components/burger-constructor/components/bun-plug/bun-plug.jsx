import styles from './bun-plug.module.css';
import PropTypes from 'prop-types';
//--------------------------------------------------------------------------------

const BunPlug = ({ children, position, border }) => (
  <div
    className={
      position === 'top'
        ? `${styles.plug} ${styles.plug_pos_top}`
        : position === 'bottom'
        ? `${styles.plug} ${styles.plug_pos_bottom}`
        : `${styles.plug}`
    }
    style={{ borderColor: `${border}` }}>
    {children}
  </div>
);

BunPlug.propTypes = {
  position: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.string
};

export default BunPlug;
