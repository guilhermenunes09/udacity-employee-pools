import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducers";
import middleware from "./store/middleware";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducer, middleware);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>
);
