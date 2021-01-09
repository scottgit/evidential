import { faHome, faSignInAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import FAI from './includes/FAI';
import Logo from './includes/Logo';
import './NavBar.css';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className="main-nav">
      <Logo />
      <ul>
        { !authenticated &&
          <>
            <li>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                <FAI icon={faUserPlus} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                <FAI icon={faSignInAlt} />
              </NavLink>
            </li>
          </>
        }
        { authenticated &&
          <>
            <li>
              <NavLink to="/users" exact={true} activeClassName="active">
                <FAI icon={faUsers} />
              </NavLink>
            </li>
            <li>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
          </>
        }
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <FAI icon={faHome} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
