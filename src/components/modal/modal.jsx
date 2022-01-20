import styles from './modal.module.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './components/modal-overlay';

const Modal = ({ closeModal, children }) => {
  const [closeIconState, setCloseIconState] = useState(false);
  const rootModal = document.getElementById('root-modal');

  useEffect(() => {
    const closeModalByEsc = e => {
      e.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.popup}>
      <div className={`p-10 pb-15 ${styles.popupContainer}`}>
        <button
          onClick={closeModal}
          className={`mt-15 mr-10 ${styles.closeButton}`}
          onMouseEnter={() => setCloseIconState(true)}
          onMouseLeave={() => setCloseIconState(false)}>
          <CloseIcon type={closeIconState ? 'secondary' : 'primary'} />
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    rootModal
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
