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
export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const SEND_COMMENT = "SEND_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

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
const requestComments = id => ({
    type: REQUEST_COMMENTS,
    id
});

const receiveComments = (id, comments = []) => ({
    type: RECEIVE_COMMENTS,
    id,
    comments,
    receivedAt: Date.now()
});
const removeComment = (articleId, commentId, comments = []) => ({
    type: REMOVE_COMMENT,
    articleId,
    commentId,
    comments
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

const sendComment = (comment, comments, id) => ({
    type: SEND_COMMENT,
    id,
    comments,
    comment
});
export const fetchArticles = (topic = "all") => dispatch => {
    dispatch(requestArticles(topic));
    return axios
        .get(`https://nc-news-api.herokuapp.com/api/articles?limit=1000`)
        .then(({ data: { articles } }) => {
            dispatch(receiveArticles(topic, articles));
        });
};

export const fetchArticleById = id => dispatch => {
    dispatch(requestArticle(id));
    return axios
        .get(`https://nc-news-api.herokuapp.com/api/articles/${id}`)
        .then(({ data: { article } }) => {
            dispatch(receiveArticle(id, article));
        })
        .catch(e => {
            console.log(e);
            dispatch(receiveArticle(id, {}));
        });
};

const shouldFetchArticles = state => {
    const { fetchedAll } = state.articles || { fetchedAll: false };
    return !fetchedAll ? true : false;
};

export const fetchArticlesIfNeeded = () => (dispatch, getState) =>
    shouldFetchArticles(getState())
        ? dispatch(fetchArticles())
        : Promise.resolve();

export const fetchComments = id => dispatch => {
    dispatch(requestComments(id));
    return axios
        .get(`https://nc-news-api.herokuapp.com/api/articles/${id}/comments`)
        .then(({ data: { comments } }) => {
            dispatch(receiveComments(id, comments));
        });
};

export const postComment = (id, comment) => (dispatch, getState) => {
    const state = getState();
    const { comments } = state;
    dispatch(sendComment(comment, comments, id));
};

export const deleteComment = (articleId, commentId) => (dispatch, getState) => {
    dispatch(removeComment(articleId, commentId, getState().comments));
};
