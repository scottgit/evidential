import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";

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

  const getDataChanges = () => (
    <div>
      <h4>Data Changes</h4>
      <ul>
        {user.dataChanges.map(change => (
          <li key={'change-'+ change.id}>
            Changed {change.table} on {change.changedAt}
        {/* "oldData": json.loads(self.old_data),
        "newData": json.loads(self.new_data), */}
          </li>
        ))}
      </ul>
    </div>
  )

  const getTextsAdded = () => (
    <div>
      <h4>Texts Added</h4>
      <ul>
        {user.textsAdded.map(text => (
          <li key={'text-'+ text.id}>
            Added "{text.title}" on {text.createdAt}
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className="ev-content-wrapper --single-page">
      <main className="ev-main">
        <header><h1>{user.siteIdentifier}</h1></header>
        <div><strong>User signed up: </strong> {user.createdAt}</div>
        <div><strong>Status: </strong> {user.deleted ? 'Deactivated' : 'Active'}</div>
        {(user.dataChanges && getDataChanges())}
        {(user.textsAdded && getTextsAdded())}
      </main>
    </div>
  );
}
export default User;
