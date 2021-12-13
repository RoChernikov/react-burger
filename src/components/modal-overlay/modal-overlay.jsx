import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ closeModal }) => {
  return <div className={styles.modalOverlay} onClick={closeModal}></div>;
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;
