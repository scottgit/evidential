import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { logout } from "../../services/auth";
import FAI from "../includes/FAI";
import ConfirmModal from "../includes/ConfirmModal";

const LogoutButton = ({setAuthenticated, setCurrentUser, title}) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = (e) => {
    setShowModal(true);
  }

  const checkShowModal = (e) => {
    if (e.key === 'Enter') /* enter */ {
      setShowModal(true);
    }
  }

  const handleCloseModal = (e) => {
    setShowModal(false);
  }

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setCurrentUser(null);
  };

  const modalProps = {showModal, handleCloseModal, affirmAction: onLogout, message: "Please confirm you wish to logout."}

  // TODO Make a warning wrapper to confirm logout
  return (
    <>
      <FAI id="nav-logout"
      icon={faSignOutAlt}
      onClick={handleShowModal}
      onKeyDown={checkShowModal}
      tabIndex="0"
      title={title}
      className="--direct-hover"
      />
      <ConfirmModal {...modalProps} />
    </>
  )
};

export default LogoutButton;
