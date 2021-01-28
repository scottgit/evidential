import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpAndEditForm from "./components/auth/SignUpAndEditForm";
import NavBar from "./components/structure/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  User,
  UsersList,
  TextDetail,
  ClaimDetail,
  Home,
  PageNotFound
} from "./services/pages";
import { authenticate } from "./services/auth";
import Footer from "./components/structure/Footer";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    let stillMounted = true;
    (async() => {
      try {
        const user = await authenticate();
        if (stillMounted) {
          if (user && !user.errors) {
            setAuthenticated(true);
            setCurrentUser(user);
          }
          setLoaded(true);
        }
      } catch (err) {
        if (stillMounted) {
          setLoaded(true);
          // console.error(err);
        }
      }
    })();
    return function cleanUp() {
      stillMounted = false;
    }
  }, []);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route path="/" exact={true}>
          <Home
            authenticated={authenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
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
            setCurrentUser={setCurrentUser}
            edit={false}
          />
        </Route>
        <Route path={"/text/view/:textId(\\d+)"} exact={true}>
          <TextDetail authenticated={authenticated} currentUser={currentUser} />
        </Route>
        <Route path={"/claim/view/:claimId(\\d+)"} exact={true}>
          <ClaimDetail authenticated={authenticated} currentUser={currentUser} />
        </Route>
        <ProtectedRoute
          path={"/text/(edit|analyze)/:textId(\\d+)" }
          exact={true}
          authenticated={authenticated}
          currentUser={currentUser}
          >
          <TextDetail
            authenticated={authenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/edit-your-info" exact={true} authenticated={authenticated}>
          <SignUpAndEditForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            edit={true}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path={"/users/:userId(\\d+)"} exact={true} authenticated={authenticated}>
          <User currentUser={currentUser} />
        </ProtectedRoute>
        <Route path="/page-not-found">
          <PageNotFound />
        </Route>
        <Redirect to='/page-not-found' />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
