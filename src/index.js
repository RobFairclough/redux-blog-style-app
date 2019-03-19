import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { selectTopic, fetchArticlesIfNeeded } from "./actions";
import rootReducer from "./reducers";
import "./index.css";
import Root from "./containers/Root";

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(selectTopic("all"));
store
    .dispatch(fetchArticlesIfNeeded("all"))
    .then(() => console.log(store.getState()));

ReactDOM.render(<Root />, document.getElementById("root"));
