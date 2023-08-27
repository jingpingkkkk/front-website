import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './welcome-popup.css';

const WelcomePopup = ({ isOpen, onClose }) => {
  console.log('Welcome', isOpen);
  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className="home-modal"
      centered
      size="xl"
    >
      <div className="modal-header">
        <div className="close-login-modal">
          <button type="button" className="close-home-modal" onClick={onClose}>
            <img src="./images/close-icon.png" alt="close" />
          </button>
        </div>
      </div>
      <ModalBody>
        <div className="home-modal-title">
          <img src="./images/warning.png" alt="warning" />
          <div>Proud Sponsor of The Tournament NZ vs UAE</div>
        </div>
        <img src="./images/welcome.png" className="img-fluid" alt="back-img" />
      </ModalBody>
    </Modal>
  );
};

export default WelcomePopup;
