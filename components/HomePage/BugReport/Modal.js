import React, { useEffect, useRef } from 'react';
import Styles from './index.module.css';
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2';
const{mouseDownText}=GLOBALLY_COMMON_TEXT.events
const {modalBackgroundText}=HOME_PAGE_TEXT.text

const Modal = ({ children, show, closeModal }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleWindowClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        window.addEventListener(mouseDownText, handleWindowClick);
        return () => {
            window.removeEventListener(mouseDownText, handleWindowClick);
        };
    }, [closeModal]);

    if (!show) {
        return null;
    }

    return (
        <div className={Styles.modalOverlay} id={modalBackgroundText}>
            <div className={Styles.modalContent} ref={modalRef}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
