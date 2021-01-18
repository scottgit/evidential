import React from 'react';
import ReactModal from 'react-modal';
import FAI from "../includes/FAI";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = ({modalMsgRef, showModal, handleCloseModal, affirmAction, message, closeDelay=0}) => {
  return (
    <ReactModal
    isOpen={showModal}
    closeTimeoutMS={closeDelay}
    overlayClassName="ev-modal-overlay"
    className="ev-modal-content --small"
  >
    <button className="ev-button icon ev-modal-close" onClick={handleCloseModal}>
      <FAI icon={faWindowClose} />
    </button>
    <div className="ev-confirm" ref={modalMsgRef}>
      <p>{message}</p>
      <div>
        <button className="ev-button" type="button" onClick={affirmAction}>Yes</button>
        <button className="ev-button" type="button" onClick={handleCloseModal}>No</button>
      </div>
    </div>
  </ReactModal>
  )
}

export default ConfirmModal
