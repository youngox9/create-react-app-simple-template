import React from "react";
import ReactDOM from "react-dom";

import "normalize.css/normalize.css";
import "@/styles/style.scss";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab);
library.add(far);
library.add(fas);
dom.watch();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
