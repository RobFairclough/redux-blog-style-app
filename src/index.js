import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import "./index.css";
import Root from "./containers/Root";

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

ReactDOM.render(<Root />, document.getElementById("root"));
