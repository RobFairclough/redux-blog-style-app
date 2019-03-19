import { combineReducers } from "redux";
import {
    SELECT_TOPIC,
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    RECEIVE_ARTICLE
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

const articlesByTopic = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ARTICLES:
        case RECEIVE_ARTICLES:
            return {
                ...state,
                [action.topic]: articles(state[action.topic], action)
            };
        case RECEIVE_ARTICLE:
            const { items } = state.all || { items: [] };
            return {
                ...state,
                all: { items: [...items, action.article] }
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    articlesByTopic,
    selectedTopic
});

export default rootReducer;
