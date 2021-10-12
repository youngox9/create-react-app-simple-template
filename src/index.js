import React from "react";
import ReactDOM from "react-dom";

import "normalize.css/normalize.css";
import "@/styles/style.scss";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
