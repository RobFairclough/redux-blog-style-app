import { combineReducers } from "redux";
import {
    SELECT_TOPIC,
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    RECEIVE_ARTICLE,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS
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
        default:
            return state;
    }
};

const comments = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_COMMENTS:
        case RECEIVE_COMMENTS:
            return {
                ...state,
                [action.id]: action.comments
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
