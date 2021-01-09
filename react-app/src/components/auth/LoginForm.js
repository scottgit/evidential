import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loginOrRecheckPassword } from "../../services/auth";
import "./LoginForm.css";
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import FAI from '../includes/FAI';

const LoginForm = ({ authenticated, setAuthenticated, setCurrentUser }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await loginOrRecheckPassword(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      setCurrentUser(user);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="content-wrapper user-info-change">
      <h1>Log In</h1>
      <main>
        <form onSubmit={onLogin}>
          <div className="form-errors">
            {errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button className="icon submit" type="submit"><FAI icon={faSignInAlt} /></button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
