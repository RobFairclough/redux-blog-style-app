import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { postCommentVote, postArticleVote } from "../actions";
import { API_URL } from "../utils";

const Vote = ({ votes, id, type, dispatch, articleId }) => {
    const [score, setScore] = useState(votes || 0);
    const handleVote = vote => {
        const num = vote === "UP" ? 1 : -1;
        setScore(score + num);
        axios.put(`${API_URL}/${type}/${id}?vote=${vote}`, { vote });
        dispatch(
            type === "comments"
                ? postCommentVote(id, articleId, num)
                : postArticleVote(id, num)
        );
    };

    return (
        <div className="vote-container">
            <button onClick={() => handleVote("UP")}>UP</button>
            <p>{score}</p>
            <button onClick={() => handleVote("DOWN")}>DOWN</button>
        </div>
    );
};

export default connect()(Vote);
