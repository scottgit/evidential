import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import TextsAdded from './TextsAdded';
import DataChanges from './DataChanges';

function User() {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false)
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setRedirect(true)
      }
    })();
  }, [userId]);

  if (redirect) {
    return <Redirect to={{
      pathname: "/page-not-found",
      state: {formerPath: location.pathname}
    }}/>
  }




  return (
    <div className="ev-content-wrapper --single-page">
      <main className="ev-main">
        <header><h1>{user.siteIdentifier}</h1></header>
        <div><strong>User signed up: </strong> {user.createdAt}</div>
        <div><strong>Status: </strong> {user.deleted ? 'Deactivated' : 'Active'}</div>
        {(user.dataChanges && <DataChanges user={user} />)}
        {(user.textsAdded && <TextsAdded user={user} />)}
      </main>
    </div>
  );
}
export default User;
