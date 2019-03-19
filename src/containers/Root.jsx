import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import App from "../App";
import Article from "../components/Article";

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={App} />
            <Route path="/articles/:id" component={Article} />
        </Router>
    </Provider>
);
export default Root;
