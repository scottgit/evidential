import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { logout } from "../../services/auth";
import FAI from "../includes/FAI";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <FAI icon={faSignOutAlt} onClick={onLogout} />;
};

export default LogoutButton;
