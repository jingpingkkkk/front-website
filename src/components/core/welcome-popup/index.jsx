import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './welcome-popup.css';
import { useSelector } from 'react-redux';
import useScreenWidth from '../../../hooks/use-screen-width';

const WelcomePopup = ({ isOpen, onClose }) => {
  const { themeSettings } = useSelector((state) => state.themeSettings);

  const { isMobile, isTablet } = useScreenWidth();
  const imageURL =
    isMobile || isTablet
      ? themeSettings?.welcomeMobileImage
      : themeSettings?.welcomeDesktopImage;

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
          <div>{themeSettings?.welcomeMessage || ''}</div>
        </div>
        <img
          src={imageURL || 'images/welcome.png'}
          className="img-fluid"
          alt="back-img"
        />
      </ModalBody>
    </Modal>
  );
};

export default WelcomePopup;
