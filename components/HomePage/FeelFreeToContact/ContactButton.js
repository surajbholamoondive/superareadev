import React, { useState } from 'react';
import Modal from './Modal';
import FeelFreeToContact from './index.js';
import Styles from './index.module.css';
import MessageIcon from "../../../assets/social/Message_light.svg"
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HOME_PAGE_TEXT } from '@/textV2';
const {adminRoute}=HOME_PAGE_TEXT.routes

const ContactButton = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const pathWithoutMsgIcon = [
    adminRoute
  ];
  const notShowIcon = pathWithoutMsgIcon.some(path => router.asPath.includes(path));
   if (notShowIcon) {
    return null;
  }
  return (
    <>
      <button onClick={toggleModal} className={Styles.contactButton}>
        <Image
          src={MessageIcon}
          className={Styles.contactButtonIcon}
          alt='Message Icon'
        />
      </button>
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <FeelFreeToContact closeModal={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default ContactButton;
