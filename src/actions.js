import axios from "axios";
import { API_URL } from "./utils";

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
export const SEND_ARTICLE_VOTE = "SEND_ARTICLE_VOTE";
export const SEND_COMMENT_VOTE = "SEND_COMMENT_VOTE";

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

const sendCommentVote = (id, commentId, num) => ({
    type: SEND_COMMENT_VOTE,
    id,
    commentId,
    num
});
const sendArticleVote = (id, num) => ({
    type: SEND_ARTICLE_VOTE,
    id,
    num
});

export const fetchArticles = (topic = "all") => dispatch => {
    dispatch(requestArticles(topic));
    return axios
        .get(`${API_URL}/articles?limit=1000`)
        .then(({ data: { articles } }) => {
            dispatch(receiveArticles(topic, articles));
        });
};

export const fetchArticleById = id => dispatch => {
    dispatch(requestArticle(id));
    return axios
        .get(`${API_URL}/articles/${id}`)
        .then(({ data: { article } }) => {
            dispatch(receiveArticle(id, article));
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
        .get(`${API_URL}/articles/${id}/comments`)
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

export const postCommentVote = (id, articleId, num) => dispatch => {
    // dispatch(sendCommentVote(articleId, id, num));
};
export const postArticleVote = (id, num) => dispatch => {
    dispatch(sendArticleVote(id, num));
};
