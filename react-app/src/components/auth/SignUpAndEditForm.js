import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpAndEditForm = ({authenticated, setAuthenticated, edit}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(edit ? false : true)

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await signUp(firstName, lastName, email, password, confirmPassword);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (authenticated && !edit) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
      {/* autocomplete, list, maxlength, minlength, pattern, placeholder, readonly, required and size */}
        <label for="first_name">First Name</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={updateFirstName}
          value={firstName}
          maxLength={40}
          required={edit ? false : true}
        ></input>
      </div>
      <div>
        <label for="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={updateLastName}
          value={lastName}
          required={edit ? false : true}
        ></input>
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={updateEmail}
          value={email}
          required={edit ? false : true}
        ></input>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={edit ? false : true}
        ></input>
      </div>
      <div>
        <label for="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          type="password"
          name="confirm_password"
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={password ? true : false}
        ></input>
      </div>
      <button type="submit">{edit ? 'Edit Info' : 'Sign Up'}</button>
    </form>
  );
};

export default SignUpAndEditForm;
