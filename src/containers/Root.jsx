import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import App from "../App";
import Article from "../components/Article";
import Header from "../components/Header";
import Form from "../components/Form";

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <Router>
            <Header />
            <Route exact path="/" component={App} />
            <Route path="/articles/:id" component={Article} />
            <Route path="/form" component={Form} />
        </Router>
    </Provider>
);
export default Root;
