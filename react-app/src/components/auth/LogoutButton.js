import { faSignOutAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import ReactModal from 'react-modal';
import { logout } from "../../services/auth";
import FAI from "../includes/FAI";

const LogoutButton = ({setAuthenticated, setCurrentUser, title}) => {
  const [showModal, setShowModal] = useState(false)

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setCurrentUser(null);
  };

  const handleShowModal = (e) => {
    setShowModal(true);
  }

  const handleCloseModal = (e) => {
    setShowModal(false);
  }


  // TODO Make a warning wrapper to confirm logout
  return (
    <>
      <FAI id="nav-logout"
      icon={faSignOutAlt}
      onClick={handleShowModal}
      onKeyDown={handleShowModal}
      tabIndex="0"
      title={title}
      className="--direct-hover"
      />
      <ReactModal
        isOpen={showModal}
        closeTimeoutMS={500}
        overlayClassName="ev-modal-overlay"
      >
        <button className="button icon ev-modal-close" onClick={handleCloseModal}>
          <FAI icon={faWindowClose} />
        </button>
        <div className="ev-confirm">
          <p>Please confirm you wish to logout.</p>
          <div>
            <button type="button" onClick={onLogout}>Yes</button>
            <button type="button" onClick={handleCloseModal}>No</button>
          </div>
        </div>
      </ReactModal>
    </>
  )
};

export default LogoutButton;
