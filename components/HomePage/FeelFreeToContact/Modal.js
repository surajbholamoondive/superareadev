import React, { useEffect, useRef } from 'react';
import Styles from './index.module.css';
import { HOME_PAGE_TEXT } from '@/textV2';
const{modalBackground,mouseDown}=HOME_PAGE_TEXT.feelFreeToConnect
const Modal = ({ children, show, closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    window.addEventListener(mouseDown, handleWindowClick);
    return () => {
      window.removeEventListener(mouseDown, handleWindowClick);
    };
  }, [closeModal]);

  if (!show) {
    return null;
  }

  return (
    <div className={Styles.modalOverlay} id={modalBackground}>
      <div className={Styles.modalContent} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
