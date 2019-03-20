import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { postCommentVote, postArticleVote } from "../actions";
import { API_URL } from "../utils";

const Vote = ({ votes, id, type, dispatch, articleId }) => {
    const [score, setScore] = useState(votes || 0);
    const handleVote = vote => {
        console.log(type, id, vote);
        const num = vote === "up" ? 1 : -1;
        setScore(score + num);
        console.log(`${API_URL}/${type}/${id}?vote=${vote}`);
        axios
            .put(`${API_URL}/${type}/${id}?vote=${vote}`, { vote })
            .then(console.log);
        dispatch(
            type === "comments"
                ? postCommentVote(id, articleId, num)
                : postArticleVote(id, num)
        );
    };

    return (
        <div className="vote-container">
            <button onClick={() => handleVote("up")}>up</button>
            <p>{score}</p>
            <button onClick={() => handleVote("down")}>down</button>
        </div>
    );
};

export default connect()(Vote);
