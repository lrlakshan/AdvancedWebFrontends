import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { dataTestIds, stateTypes } from "../tests/constants/components";
import { setNotifications } from "../redux/actionCreators/notificationActions";
import { register } from "../redux/actionCreators/thunks/users";

const Register = () => {
  const { inputId, clickId, notificationId, containerId } = dataTestIds;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    if (name.length < 3) {
      dispatch(setNotifications(stateTypes.auth, notificationId.error(stateTypes.auth), "Name must be at least 3 characters long", Date.now()));
      return;
    }

    if (!validEmailRegex.test(email)) {
      dispatch(setNotifications(stateTypes.auth, notificationId.error(stateTypes.auth), "Email is not in a valid format", Date.now()));
      return;
    }

    if (password.length < 10) {
      dispatch(setNotifications(stateTypes.auth, notificationId.error(stateTypes.auth), "Password must be at least 10 characters long", Date.now()));
      return;
    }

    if (password !== passwordConfirmation) {
      dispatch(setNotifications(stateTypes.auth, notificationId.error(stateTypes.auth), "Password and password confirmation do not match", Date.now()));
      return;
    }

    // Data representing the user to be register
    const userData = {
      name: name,
      email: email,
      password: password
    };

    dispatch(register(userData));
  };

  return (
    <div data-testid={containerId.form}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputId.name}>Name:</label>
          <input
            type="text"
            id={inputId.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid={inputId.name}
            required
          />
        </div>
        <div>
          <label htmlFor={inputId.email}>Email:</label>
          <input
            type="email"
            id={inputId.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid={inputId.email}
            required
          />
        </div>
        <div>
          <label htmlFor={inputId.password}>Password:</label>
          <input
            type="password"
            id={inputId.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid={inputId.password}
            required
          />
        </div>
        <div>
          <label htmlFor={inputId.passwordConfirmation}>Confirm Password:</label>
          <input
            type="password"
            id={inputId.passwordConfirmation}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            data-testid={inputId.passwordConfirmation}
            required
          />
        </div>
        <button type={clickId.submit} data-testid={clickId.submit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
