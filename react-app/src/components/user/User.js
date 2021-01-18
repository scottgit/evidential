import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import TextsAdded from './TextsAdded';
import DataChanges from './DataChanges';
import Loader from "../includes/Loader";

function User({currentUser}) {
  const { userId }  = useParams();
  const [user, setUser] = useState(currentUser && currentUser.id === userId ? currentUser : null);
  const [redirect, setRedirect] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (!user && userId) {
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        } else {
          setRedirect(true)
        }
      })();
    }
  }, [user, userId]);

  if (redirect) {
    return <Redirect to={{
      pathname: "/page-not-found",
      state: {formerPath: location.pathname}
    }}/>
  }

  return (
    <div className="ev-content-wrapper --single-page">
      <main className="ev-main">
        <header>
          <h1>User: {user ? user.siteIdentifier : <> Loading <Loader className="in-text" /></>}</h1>
        </header>
        {user &&
          <>
            <div><strong>User signed up: </strong> {user.createdAt}</div>
            <div><strong>Status: </strong> {user.deleted ? 'Deactivated' : 'Active'}</div>
            {(!!user.dataChanges.length && <DataChanges user={user} />)}
            {(!!user.textsAdded.length && <TextsAdded user={user} currentUser={currentUser} />)}
          </>
        }

      </main>
    </div>
  );
}
export default User;
