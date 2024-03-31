/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import AppWrapper from "./AppWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </Provider>
);
