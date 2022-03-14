import styles from './modal-overlay.module.scss';
import React, { FC } from 'react';
import { TCloseModal } from '../../../../utils/types';
//--------------------------------------------------------------------------------

const ModalOverlay: FC<TCloseModal> = ({ closeModal }) => {
  return <div className={styles.modalOverlay} onClick={closeModal}></div>;
};

export default ModalOverlay;
