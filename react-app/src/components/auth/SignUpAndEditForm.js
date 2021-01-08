import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUpOrEdit, loginOrRecheckPassword } from '../../services/auth';

const SignUpAndEditForm = ({authenticated, setAuthenticated, edit, currentUser}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationPassword, setVerficationPassword] = useState("")
  const [verified, setVerified] = useState(edit ? false : true)
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await signUpOrEdit(firstName, lastName, email, password, confirmPassword, edit);
      if (!user.errors && !edit) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors)
      }
    }
  };

  const handleVerify = async (e) => {
    if (!currentUser) return;
    e.preventDefault();
    const res = await loginOrRecheckPassword(currentUser.email, verificationPassword, edit);
    if ("validated" in res && res.validated === true) {
      setVerified(true)
    } else {
      setErrors(res.errors)
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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

  const updateVerificationPassword = (e) => {
    setVerificationPassword(e.target.value);
  };


  if (authenticated && !edit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-wrapper user-info">
      <h1>
      { (edit && `Edit ${currentUser.siteIdentifier}`)
        ||
        "Sign Up"
      }
      </h1>
      { (!!errors.length) &&
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      }
      <section className="verify">
        <p>
          Please submit a password verification in order to open up editing of your user information.
        </p>
        <form onSubmit={handleVerify}>
            <label for="verify_password">Verify Current Password</label>
            <input
              id="verify_password"
              type="password"
              name="verify_password"
              onChange={updateVerificationPassword}
              value={verificationPassword}
              required={edit}
            ></input>
          <button type="submit">Verify Identity</button>
        </form>
      </section>
      { verified &&
        <main className="change-form">
          <p>
          { (edit && "Leave blank any items not being updated.")
            ||
            "All fields must be filled in. As this is a site focused on academic integrity, please use real first and last names."
          }
          </p>
          <p>{edit && "If updating Password, then"} Password and Confirm password must match and should have a minimum of 8 characters, with at least 1 lower case, 1 upper case, 1 number, and 1 special character of: {"@$!%*?&"}</p>

          <form onSubmit={handleSubmit}>
            <div>
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
        </main>
      }
    </div>
  );
};

export default SignUpAndEditForm;
