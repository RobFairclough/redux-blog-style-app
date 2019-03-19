import axios from "axios";

export const SELECT_TOPIC = "SELECT_TOPIC";

export const selectTopic = topic => ({
    type: SELECT_TOPIC,
    topic
});

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";

const requestArticles = topic => ({
    type: REQUEST_ARTICLES,
    topic
});

const receiveArticles = (topic, json) => ({
    type: RECEIVE_ARTICLES,
    topic,
    articles: json.data ? json.data.children.map(child => child.data) : [],
    receivedAt: Date.now()
});

export const fetchArticles = (topic = "all") => async dispatch => {
    dispatch(requestArticles(topic));
    // fetch for topic if given otherwise fetch all
    const path = topic ? `topics/${topic}/articles` : "articles";
    const articles = await axios.get(
        `https://nc-news-api.herokuapp.com/api/${path}`
    );
    console.log(articles);
    dispatch(receiveArticles(topic, articles));
};

// could add caching / fetch articles if needed here
