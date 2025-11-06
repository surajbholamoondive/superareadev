import React, { useState } from 'react';
import Modal from './Modal';
import BugReport from './index.js';
import Styles from './index.module.css';
import BugIcon from "../../../assets/ButtonIcons/Bug.svg"
import Image from 'next/image';

const BugReportButton = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <div>
      <button onClick={toggleModal} className={Styles.contactButton}>
        <Image
          src={BugIcon}
          className={Styles.contactButtonIcon}
          alt='Message Icon'
        />
      </button>
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <BugReport setShowModal={setShowModal} closeModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default BugReportButton;
