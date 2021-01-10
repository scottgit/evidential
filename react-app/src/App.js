import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpAndEditForm from "./components/auth/SignUpAndEditForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  UsersList,
  User,
  Welcome,
  ViewText
} from "./Pages";
import Home from "./components/Home";
import { authenticate } from "./services/auth";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBalanceScaleRight, faChartBar, faCircleNotch, faCloudUploadAlt, faEye, faFileUpload, faHome, faLayerGroup, faPlus, faSave, faSearch, faSignInAlt, faSignOutAlt, faUserEdit, faUserPlus, faUserSlash, faVoteYea, faWindowClose, faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faCloudUploadAlt, faEye, faFileUpload, faVoteYea, faWindowClose, faHome, faChartBar, faBalanceScaleRight, faCircleNotch, faSignOutAlt, faSignInAlt, faSearch, faUserEdit, faUserSlash, faUserPlus, faLayerGroup, faPlus, faSave, faUsers )

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (user && !user.errors) {
        setAuthenticated(true);
        setCurrentUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="icon-svg">
      <radialGradient id="icon-gradient" r="110%" cx="30%" cy="30%">
    <stop stopColor="var(--icon-color-stop3)" offset="0" />
    <stop stopColor="var(--icon-color-stop2)" offset="0.45" />
    <stop stopColor="var(--icon-color-stop1)" offset="0.9" />
      </radialGradient>
        <linearGradient id="icon-gradient" gradientUnits="userSpaceOnUse"
    x1="0"  gradientTransform="rotate(-75)">
          <stop offset="0%" stopColor="var(--icon-color-stop1)" />
          <stop offset="30%" stopColor="var(--icon-color-stop2)" />
          <stop offset="60%" stopColor="var(--icon-color-stop2)" />
          <stop offset="100%" stopColor="var(--icon-color-stop3)" />
        </linearGradient>
      </svg> */}
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpAndEditForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            edit={false}
          />
        </Route>
        <Route path="/text/:textId" exact={true}>
          <ViewText
            authenticated={authenticated}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <ProtectedRoute path="/edit-your-info" exact={true} authenticated={authenticated}>
          <SignUpAndEditForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            edit={true}
            currentUser={currentUser}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        { !authenticated &&
        <Route path="/" exact={true}>
          <Welcome />
        </Route>
        }
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Home authenticated={authenticated} currentUser={currentUser} />
        </ProtectedRoute>
        <Route path="/page-not-found">
          <div className="content-wrapper">
            <h1>We are sorry, the requested page was not found.</h1>
          </div>
        </Route>
        <Redirect to="/page-not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
