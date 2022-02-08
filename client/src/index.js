import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./components/Context";
// import "./styles/reset.css";
import "./styles/global.css";

import App from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
