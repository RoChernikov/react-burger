import styles from './header-link.module.css';
import PropTypes from 'prop-types';

function HeaderLink({ IconComponent, active, children, onClick }) {
  return (
    <a
      href="#"
      className={
        active
          ? `pl-5 pr-5 ${styles.link} ${styles.link_active}`
          : `pl-5 pr-5 ${styles.link}`
      }
      onClick={onClick}
    >
      {IconComponent}
      <p className="text text_type_main-default ml-2">{children}</p>
    </a>
  );
}

HeaderLink.propTypes = {
  IconComponent: PropTypes.element.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default HeaderLink;
