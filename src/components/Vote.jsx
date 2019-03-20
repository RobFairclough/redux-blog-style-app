import React, { useState } from "react";
import axios from "axios";

const Vote = ({ votes, id, type }) => {
    const [score, setScore] = useState(votes || 0);
    const handleVote = vote => {
        setScore(score + (vote === "up" ? 1 : -1));
        axios.put(
            `https://nc-news-api.herokuapp.com/api/${type}/${id}?vote=${vote}`
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

export default Vote;
