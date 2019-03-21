import { combineReducers } from "redux";
import {
    SELECT_TOPIC,
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    RECEIVE_ARTICLE,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    SEND_COMMENT,
    REMOVE_COMMENT,
    REQUEST_ARTICLE,
    SEND_COMMENT_VOTE
} from "./actions";

const selectedTopic = (state = "all", action) =>
    action.type === SELECT_TOPIC ? action.topic : state;

const articles = (state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case REQUEST_ARTICLES:
            return { ...state, isFetching: true };
        case RECEIVE_ARTICLES:
            return {
                ...state,
                isFetching: false,
                items: action.articles,
                lastUpdated: action.receivedAt,
                fetchedAll: action.fetchedAll
            };
        case REQUEST_ARTICLE:
            return { ...state, isFetching: true };
        case RECEIVE_ARTICLE:
            const { items } = state.articles || { items: [] };
            return {
                ...state,
                isFetching: false,
                items: [...items, action.article]
            };
        default:
            return state;
    }
};

const comments = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_COMMENTS:
            return {
                ...state
            };
        case RECEIVE_COMMENTS:
            const comments = action.comments.reduce((all, one) => {
                all[one._id] = { ...one };
                return all;
            }, {});
            action.comments.forEach(
                comment => (comments[comment._id] = { ...comment })
            );
            return {
                ...state,
                [action.id]: comments
            };
        case SEND_COMMENT:
            return {
                ...state,
                [action.id]: [action.comment, ...action.comments[action.id]]
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                [action.articleId]: state[action.articleId].filter(
                    comment => comment._id !== action.commentId
                )
            };
        case SEND_COMMENT_VOTE:
            const { id, commentId, num } = action;
            const comment = { ...state[id][commentId] };
            const newComments = {
                ...state[id],
                [commentId]: { ...comment, votes: comment.votes + num }
            };
            return {
                ...state,
                [id]: newComments
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    articles,
    selectedTopic,
    comments
});

export default rootReducer;
