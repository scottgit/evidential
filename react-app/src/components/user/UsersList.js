import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const usersList = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.firstName} {user.lastName}</NavLink>
      </li>
    );
  });

  return (
    <div className="ev-content-wrapper --single-page">
      <main className="ev-main">
        <header><h1>Users List</h1></header>
        <ul>{usersList}</ul>
      </main>
    </div>
  );
}

export default UsersList;
