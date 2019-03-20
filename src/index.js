import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import "./index.css";
import Root from "./containers/Root";

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

ReactDOM.render(<Root />, document.getElementById("root"));
export default store;
