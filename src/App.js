import React, { useEffect } from "react";
import "./App.css";
import { fetchArticlesIfNeeded, selectTopic, fetchArticles } from "./actions";
import { connect } from "react-redux";
import Picker from "./components/Picker";
import Articles from "./components/Articles";

const App = ({
    selectedTopic,
    articles,
    isFetching,
    lastUpdated,
    dispatch
}) => {
    useEffect(() => {
        dispatch(fetchArticlesIfNeeded(selectedTopic));
    }, [selectedTopic]);

    const handleChange = newTopic => {
        dispatch(selectTopic(newTopic));
    };
    const handleRefreshClick = e => {
        e.preventDefault();
        dispatch(fetchArticles(selectedTopic));
    };

    const topics = ["all", "football", "cooking", "coding"];
    const filteredArticles =
        selectedTopic === "all"
            ? articles
            : articles.filter(({ belongs_to }) => belongs_to === selectedTopic);

    return (
        <div className="App">
            <Picker
                current={selectedTopic}
                options={topics}
                onChange={handleChange}
            />
            {lastUpdated && (
                <p>
                    Last updated at:
                    {new Date(lastUpdated).toLocaleTimeString()}
                </p>
            )}
            {!isFetching && (
                <button onClick={handleRefreshClick}>Refresh</button>
            )}
            {!articles.length &&
                (isFetching ? <h2>Loading...</h2> : <h2>Empty...</h2>)}
            <div
                style={{ opacity: isFetching ? 0.5 : 1 }}
                className="container"
            >
                <Articles articles={filteredArticles} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const { selectedTopic, articles } = state;
    const { isFetching, lastUpdated, items } = articles || {
        isFetching: true,
        items: []
    };

    return { selectedTopic, articles: items, isFetching, lastUpdated };
};

export default connect(mapStateToProps)(App);
