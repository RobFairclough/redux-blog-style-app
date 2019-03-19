import { combineReducers } from "redux";
import { SELECT_TOPIC, REQUEST_ARTICLES, RECEIVE_ARTICLES } from "./actions";

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
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
};

const articlesByTopic = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ARTICLES:
            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.topic]: articles(state[action.topic], action)
                }
            };
        case RECEIVE_ARTICLES:
            const reducerFunc = (acc, curr) => {
                acc[curr.topic]
                    ? acc[curr.topic].items.push(curr)
                    : (acc[curr.topic] = {
                          isFetching: false,
                          lastUpdated: action.receivedAt,
                          items: [curr]
                      });
                return acc;
            };
            return action.topic !== "all"
                ? {
                      ...state,
                      topics: {
                          [action.topic]: articles(state[action.topic], action)
                      }
                  }
                : {
                      ...state,
                      topics: { ...action.articles.reduce(reducerFunc, {}) }
                  };
        default:
            return state;
    }
};

const rootReducer = combineReducers({ articlesByTopic, selectedTopic });

export default rootReducer;
