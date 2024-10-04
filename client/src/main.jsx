import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./components/redux/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider store={Store}>
      <App />
    </Provider>
  </HashRouter>,
);
