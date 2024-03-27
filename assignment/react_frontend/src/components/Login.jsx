import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dataTestIds, stateTypes } from "../tests/constants/components";
import { setNotifications } from "../redux/actionCreators/notificationActions";
import { login } from "../redux/actionCreators/thunks/users";

const Login = () => {
  const { inputId, clickId, containerId, notificationId } = dataTestIds;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validEmailRegex.test(email)) {
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          "Email is not in a valid format",
          Date.now()
        )
      );
      return;
    }

    if (password.length < 10) {
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          "Password must be at least 10 characters long",
          Date.now()
        )
      );
      return;
    }

    // Data representing the user to login
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  return (
    <div data-testid={containerId.form}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type={clickId.submit} data-testid={clickId.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
