import React, { Component } from "react";
import "./App.css";
import { fetchArticlesIfNeeded, selectTopic, fetchArticles } from "./actions";
import { connect } from "react-redux";
import Picker from "./components/Picker";
import Articles from "./components/Articles";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchArticlesIfNeeded());
    }
    componentDidUpdate(prevProps) {
        const { dispatch, selectedTopic } = this.props;
        if (selectedTopic !== prevProps.selectedTopic) {
            dispatch(fetchArticlesIfNeeded(selectedTopic));
        }
    }
    handleChange = newTopic => {
        this.props.dispatch(selectTopic(newTopic));
    };

    handleRefreshClick = e => {
        e.preventDefault();
        const { dispatch, selectedTopic } = this.props;
        dispatch(fetchArticles(selectedTopic));
    };

    render() {
        const { selectedTopic, articles, isFetching, lastUpdated } = this.props;
        const topics = ["all", "football", "cooking", "coding"];
        const filteredArticles =
            selectedTopic === "all"
                ? articles
                : articles.filter(
                      article => article.belongs_to === selectedTopic
                  );
        return (
            <div className="App">
                <Picker
                    value={selectedTopic}
                    options={topics}
                    onChange={this.handleChange}
                />
                <p>
                    {lastUpdated && (
                        <span>
                            Last updated at:
                            {new Date(lastUpdated).toLocaleTimeString()}
                        </span>
                    )}
                    {!isFetching && (
                        <button onClick={this.handleRefreshClick}>
                            Refresh
                        </button>
                    )}
                </p>
                {isFetching && !articles.length && <h2>Loading...</h2>}
                {!isFetching && !articles.length && <h2>Empty...</h2>}
                <div
                    style={{ opacity: isFetching ? 0.5 : 1 }}
                    className="container"
                >
                    <Articles articles={filteredArticles} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedTopic, articlesByTopic } = state;
    const {
        isFetching,
        lastUpdated,
        items: articles
    } = articlesByTopic.all || { isFetching: true, items: [] };

    return { selectedTopic, articles, isFetching, lastUpdated };
};

export default connect(mapStateToProps)(App);
