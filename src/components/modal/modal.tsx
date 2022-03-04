import styles from './modal.module.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './components/modal-overlay/modal-overlay';
import React, { FC } from 'react';
import { TCloseModal } from '../../utils/types';
//--------------------------------------------------------------------------------

const Modal: FC<TCloseModal> = ({ closeModal, children }) => {
  const [closeIconState, setCloseIconState] = useState(false);
  const rootModal = document.getElementById('root-modal');

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.popup}>
      <div className={`pb-15 ${styles.popupContainer}`}>
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
    rootModal!
  );
};
export default Modal;
