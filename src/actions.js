import axios from "axios";

export const SELECT_TOPIC = "SELECT_TOPIC";

export const selectTopic = topic => ({
    type: SELECT_TOPIC,
    topic
});

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const REQUEST_ARTICLE = "REQUEST_ARTICLE";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";

const requestArticles = topic => ({
    type: REQUEST_ARTICLES,
    topic
});

const receiveArticles = (topic, articles = []) => ({
    type: RECEIVE_ARTICLES,
    topic,
    articles,
    receivedAt: Date.now(),
    fetchedAll: true
});
const requestArticle = id => ({
    type: REQUEST_ARTICLE,
    id
});

const receiveArticle = (id, article) => ({
    type: RECEIVE_ARTICLE,
    id,
    article,
    receivedAt: Date.now()
});

export const fetchArticles = (topic = "all") => dispatch => {
    dispatch(requestArticles(topic));
    console.log("sending request");
    return axios
        .get(`https://nc-news-api.herokuapp.com/api/articles?limit=1000`)
        .then(({ data: { articles } }) => {
            dispatch(
                receiveArticles(
                    topic,
                    topic === "all"
                        ? articles
                        : articles.filter(article => article.topic === topic)
                )
            );
        });
};

export const fetchArticleById = id => dispatch => {
    dispatch(requestArticle(id));
    console.log("sending single article request");
    return axios
        .get(`https://nc-news-api.herokuapp.com/api/articles/${id}`)
        .then(({ data: { article } }) => {
            dispatch(receiveArticle(id, article));
        });
};

const shouldFetchArticles = state => {
    const fetchedAll = state.articlesByTopic.all;
    console.log(fetchedAll);
    return !fetchedAll ? true : false;
};

export const fetchArticlesIfNeeded = (topic = "all") => (dispatch, getState) =>
    shouldFetchArticles(getState(), topic)
        ? dispatch(fetchArticles(topic))
        : Promise.resolve();
